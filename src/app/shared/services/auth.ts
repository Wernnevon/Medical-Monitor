import { Service, computed, inject, signal } from '@angular/core';
import { hashPassword } from '@core/utils/password';
import type { Council, Professional } from '@domain/entities';
import { ProfessionalGender, ProfessionalRole } from '@domain/entities';
import {
  ProfessionalAdd,
  ProfessionalFindById,
  ProfessionalFindByUsername,
} from '@domain/tokens';

const CHAVE_SESSAO = 'vittaly-sessao';

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
 * Sessão do profissional/assistente logado.
 *
 * Não há servidor, então "sessão" é só o id do profissional guardado no
 * `localStorage` — nunca a senha ou o hash — e o registro completo é
 * recarregado do IndexedDB a cada início. Isso mantém o dado sensível fora
 * de um lugar que sobrevive a limpezas parciais de storage.
 */
@Service()
export class AuthService {
  private readonly buscarPorId = inject(ProfessionalFindById);
  private readonly buscarPorUsuario = inject(ProfessionalFindByUsername);
  private readonly adicionar = inject(ProfessionalAdd);

  private readonly usuario = signal<Professional | null>(null);
  private readonly carregando = signal(true);

  readonly usuarioAtual = this.usuario.asReadonly();
  readonly restaurando = this.carregando.asReadonly();
  readonly autenticado = computed(() => this.usuario() !== null);
  readonly ehProfissional = computed(
    () => this.usuario()?.role === ProfessionalRole.PROFISSIONAL,
  );

  /** Chamado uma vez, no bootstrap, antes do router avaliar os guards. */
  async restaurar(): Promise<void> {
    const id = localStorage.getItem(CHAVE_SESSAO);
    if (!id) {
      this.carregando.set(false);
      return;
    }
    try {
      this.usuario.set(await this.buscarPorId.findById({ id }));
    } catch {
      localStorage.removeItem(CHAVE_SESSAO);
      this.usuario.set(null);
    } finally {
      this.carregando.set(false);
    }
  }

  async entrar(usuario: string, senha: string): Promise<void> {
    const encontrado = await this.buscarPorUsuario.findByUsername({
      username: usuario.trim().toLowerCase(),
    });
    const hash = await hashPassword(senha);
    if (!encontrado || encontrado.passwordHash !== hash) {
      throw new Error('Usuário ou senha inválidos');
    }
    this.abrirSessao(encontrado);
  }

  async cadastrar(dados: DadosCadastro): Promise<void> {
    const username = dados.username.trim().toLowerCase();
    if (await this.buscarPorUsuario.findByUsername({ username })) {
      throw new Error('Já existe uma conta com este usuário');
    }

    const professional: Professional = {
      id: '',
      name: dados.name.trim(),
      username,
      passwordHash: await hashPassword(dados.password),
      phone: dados.phone.trim() || undefined,
      role: dados.role,
      specialty: dados.specialty.trim() || undefined,
      council: dados.role === ProfessionalRole.PROFISSIONAL ? dados.council ?? undefined : undefined,
      gender:
        dados.role === ProfessionalRole.PROFISSIONAL ? dados.gender ?? undefined : undefined,
    };

    await this.adicionar.store({ data: professional });
    const salvo = await this.buscarPorUsuario.findByUsername({ username });
    if (salvo) this.abrirSessao(salvo);
  }

  sair(): void {
    localStorage.removeItem(CHAVE_SESSAO);
    this.usuario.set(null);
  }

  private abrirSessao(professional: Professional): void {
    localStorage.setItem(CHAVE_SESSAO, professional.id);
    this.usuario.set(professional);
  }
}
