import { Service, computed, inject, signal } from '@angular/core';
import { FIREBASE_AUTH } from '@infra/frameworks/firebase';
import { ProfessionalNotFoundError } from '@infra/repositories/get/professional';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import type { Council, Professional } from '@domain/entities';
import { ProfessionalGender, ProfessionalRole } from '@domain/entities';
import {
  ProfessionalAdd,
  ProfessionalFindById,
  ProfessionalFindByUsername,
} from '@domain/tokens';

const DOMINIO_LOGIN = 'medical-monitor.app';

export type DadosCadastro = {
  name: string;
  username: string;
  password: string;
  phone: string;
  role: ProfessionalRole;
  specialty: string;
  council: Council | null;
  gender: ProfessionalGender | null;
};

/**
 * Sessão do profissional/assistente logado, sobre o Firebase Auth.
 *
 * O login é por usuário, mas o Firebase só conhece e-mail: o usuário vira
 * `usuario@medical-monitor.app`. O perfil (nome, papel, conselho) fica em
 * `professionals/{uid}` e é recarregado a cada início de sessão.
 */
@Service()
export class AuthService {
  private readonly buscarPorId = inject(ProfessionalFindById);
  private readonly adicionar = inject(ProfessionalAdd);
  private readonly auth = inject(FIREBASE_AUTH);

  /** Conta do Firebase Auth — decide se a pessoa está logada. */
  private readonly sessao = signal<User | null>(null);
  /** Perfil do Firestore — decide o que a pessoa pode fazer. Chega depois. */
  private readonly usuario = signal<Professional | null>(null);
  private readonly carregando = signal(true);
  private perfil: Promise<void> = Promise.resolve();

  /**
   * Durante `entrar`/`cadastrar` quem carrega o perfil é o próprio método —
   * no cadastro o doc ainda nem existe quando o Auth avisa do novo usuário,
   * e o listener concluiria que a conta está quebrada.
   */
  private emAndamento = false;

  readonly usuarioAtual = this.usuario.asReadonly();
  readonly restaurando = this.carregando.asReadonly();
  readonly autenticado = computed(() => this.sessao() !== null);
  readonly ehProfissional = computed(
    () => this.usuario()?.role === ProfessionalRole.PROFISSIONAL,
  );

  /**
   * Chamado uma vez, no bootstrap, antes do router avaliar os guards.
   *
   * Só espera o Auth ler a sessão salva no próprio navegador, o que é
   * instantâneo. O perfil vem do Firestore em segundo plano: prender o
   * bootstrap nele deixava o app inteiro num "Carregando…" enquanto o SDK
   * tentava falar com o servidor.
   */
  async restaurar(): Promise<void> {
    await this.auth.authStateReady();
    this.sessao.set(this.auth.currentUser);
    this.perfil = this.carregarPerfil(this.auth.currentUser).catch(() => undefined);
    this.carregando.set(false);

    // Mantém tudo em dia com o que acontece fora deste serviço: logout em
    // outra aba, token revogado.
    onAuthStateChanged(this.auth, (user) => {
      if (this.emAndamento) return;
      const trocouDeConta = user?.uid !== this.sessao()?.uid;
      this.sessao.set(user);
      if (trocouDeConta) {
        this.perfil = this.carregarPerfil(user).catch(() => undefined);
      }
    });
  }

  /** Resolve quando o perfil terminou de carregar (com ou sem sucesso). */
  perfilCarregado(): Promise<void> {
    return this.perfil;
  }

  async entrar(usuario: string, senha: string): Promise<void> {
    this.emAndamento = true;
    try {
      const cred = await signInWithEmailAndPassword(this.auth, paraEmail(usuario), senha);
      this.perfil = this.carregarPerfil(cred.user);
      await this.perfil;
      if (!this.usuario()) {
        throw new Error('Conta sem perfil cadastrado. Procure o administrador.');
      }
      this.sessao.set(cred.user);
    } catch (e) {
      if (this.auth.currentUser && !this.usuario()) await signOut(this.auth);
      this.sessao.set(this.usuario() ? this.auth.currentUser : null);
      throw new Error(mensagemDeErro(e));
    } finally {
      this.emAndamento = false;
    }
  }

  async cadastrar(dados: DadosCadastro): Promise<void> {
    const username = normalizaUsuario(dados.username);

    this.emAndamento = true;
    let criado: User | null = null;
    try {
      criado = (await createUserWithEmailAndPassword(this.auth, paraEmail(username), dados.password))
        .user;

      const professional: Professional = {
        id: criado.uid,
        name: dados.name.trim(),
        username,
        phone: dados.phone.trim() || undefined,
        role: dados.role,
        specialty: dados.specialty.trim() || undefined,
        council:
          dados.role === ProfessionalRole.PROFISSIONAL ? (dados.council ?? undefined) : undefined,
        gender:
          dados.role === ProfessionalRole.PROFISSIONAL ? (dados.gender ?? undefined) : undefined,
      };

      await this.adicionar.store({ data: professional });
      this.usuario.set(professional);
      this.sessao.set(criado);
    } catch (e) {
      // Sem o perfil a conta não serve para nada e ainda prenderia o
      // usuário escolhido: desfaz a criação no Auth.
      if (criado && !this.usuario()) await deleteUser(criado).catch(() => undefined);
      throw new Error(mensagemDeErro(e));
    } finally {
      this.emAndamento = false;
    }
  }

  async sair(): Promise<void> {
    this.usuario.set(null);
    this.sessao.set(null);
    await signOut(this.auth);
  }

  private async carregarPerfil(user: User | null): Promise<void> {
    if (!user) {
      this.usuario.set(null);
      return;
    }
    try {
      this.usuario.set(await this.buscarPorId.findById({ id: user.uid }));
    } catch (e) {
      // Nunca inventar um perfil aqui: o papel decide o que a pessoa pode
      // fazer, e um valor padrão daria acesso de profissional a assistente.
      this.usuario.set(null);
      // Só encerra a sessão quando o perfil de fato não existe; falha de
      // rede não deve deslogar quem está offline.
      const causa = e instanceof Error ? e.cause : undefined;
      if (causa instanceof ProfessionalNotFoundError) {
        this.sessao.set(null);
        await signOut(this.auth);
      }
      else throw e;
    }
  }
}

function normalizaUsuario(usuario: string): string {
  return usuario.trim().toLowerCase();
}

function paraEmail(usuario: string): string {
  return `${normalizaUsuario(usuario)}@${DOMINIO_LOGIN}`;
}

function mensagemDeErro(error: unknown): string {
  // A camada de dados embrulha o erro original em `cause` (ver `failed`).
  const original = error instanceof Error && error.cause ? error.cause : error;
  const code = (original as { code?: string } | null)?.code ?? '';
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-email':
      return 'Usuário ou senha inválidos';
    case 'auth/email-already-in-use':
      return 'Já existe uma conta com este usuário';
    case 'auth/weak-password':
      return 'A senha precisa ter pelo menos 6 caracteres';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde alguns minutos e tente de novo.';
    case 'auth/network-request-failed':
      return 'Sem conexão com a internet. Verifique a rede e tente de novo.';
    case 'auth/operation-not-allowed':
      return 'Login por usuário e senha não está habilitado no Firebase.';
    case 'permission-denied':
      return 'Sem permissão para acessar os dados. Verifique as regras do Firestore.';
  }
  if (code === 'unavailable') return 'Sem conexão com o servidor. Tente de novo em instantes.';
  return error instanceof Error && !code && !error.cause
    ? error.message
    : 'Não foi possível concluir. Tente novamente.';
}
