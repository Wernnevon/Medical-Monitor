import { Component, computed, effect, inject, input, resource, signal, untracked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '@app/shared/components/icon/icon';
import type { Patient } from '@domain/entities';
import { PatientFindById, PatientListPagination } from '@domain/tokens';
import { CertificatePreview } from './certificate-preview';
import {
  LIMITE_TEXTO,
  TIPOS_ATESTADO,
  diasEntre,
  formularioVazio,
  somarDias,
  type AtestadoForm,
} from './certificate-form';

const MINIMO_BUSCA = 2;
const ATRASO_BUSCA_MS = 250;

/**
 * Atestado médico. Sem entidade de domínio nem persistência, igual ao
 * legado: preenche, confere na pré-visualização e imprime. `patientId`
 * chega como query param (ver `PrescriptionPage`); escolher um paciente
 * pela busca só troca esse query param, então o fluxo é um só.
 */
@Component({
  selector: 'app-certificate-page',
  imports: [Icon, CertificatePreview, RouterLink],
  templateUrl: './certificate-page.html',
  styleUrl: './certificate-page.scss',
})
export class CertificatePage {
  readonly patientId = input('');

  private readonly findPatient = inject(PatientFindById);
  private readonly listPatients = inject(PatientListPagination);

  protected readonly tipos = TIPOS_ATESTADO;
  protected readonly limite = LIMITE_TEXTO;

  protected readonly paciente = signal<Patient | null>(null);
  protected readonly form = signal<AtestadoForm>(formularioVazio());

  /** Com nome preenchido já dá pra imprimir — o resto a folha deixa em
   *  branco ou com traço para completar à mão. */
  protected readonly podeImprimir = computed(() => Boolean(this.form().nome.trim()));

  /** Comparecimento é um dia só, não tem período nem quantidade. */
  protected readonly comparecimento = computed(() => this.form().tipo === 'COMPARECIMENTO');

  // ---- Busca de paciente (combobox) ----

  private readonly termo = signal('');
  protected readonly listaAberta = signal(false);
  protected readonly ativo = signal(-1);
  private temporizador?: ReturnType<typeof setTimeout>;

  private readonly resultados = resource({
    params: () => {
      const termo = this.termo().trim();
      return termo.length >= MINIMO_BUSCA ? termo : undefined;
    },
    loader: ({ params }) =>
      this.listPatients.listPagination({ keywords: params.split(/\s+/), page: 1, pageSize: 8 }),
  });

  protected readonly sugestoes = computed(() =>
    this.resultados.hasValue() ? this.resultados.value().entries : [],
  );
  protected readonly buscando = computed(() => this.resultados.isLoading());
  protected readonly mostrarLista = computed(
    () => this.listaAberta() && this.termo().trim().length >= MINIMO_BUSCA,
  );

  constructor() {
    effect(() => {
      const id = this.patientId();
      untracked(() => this.carregar(id));
    });
  }

  private carregar(id: string): void {
    this.paciente.set(null);
    this.form.set(formularioVazio());
    if (!id) return;
    this.findPatient.findById({ id }).then((p) => this.preencherPaciente(p));
  }

  /** O campo de nome é também a busca: digitar edita o nome e sugere
   *  pacientes; escolher um preenche os dados dele. */
  protected editarNome(valor: string): void {
    this.atualizar('nome', valor);
    this.paciente.set(null);
    this.listaAberta.set(true);
    this.ativo.set(-1);
    clearTimeout(this.temporizador);
    this.temporizador = setTimeout(() => this.termo.set(valor), ATRASO_BUSCA_MS);
  }

  protected teclaBusca(evento: KeyboardEvent): void {
    const total = this.sugestoes().length;
    switch (evento.key) {
      case 'ArrowDown':
        evento.preventDefault();
        this.listaAberta.set(true);
        if (total) this.ativo.update((i) => (i + 1) % total);
        break;
      case 'ArrowUp':
        evento.preventDefault();
        if (total) this.ativo.update((i) => (i <= 0 ? total - 1 : i - 1));
        break;
      case 'Enter': {
        const escolhido = this.sugestoes()[this.ativo()];
        if (escolhido) {
          evento.preventDefault();
          this.escolher(escolhido);
        }
        break;
      }
      case 'Escape':
        this.listaAberta.set(false);
        break;
    }
  }

  protected fecharLista(): void {
    // Deixa o clique numa sugestão chegar antes de a lista sumir.
    setTimeout(() => this.listaAberta.set(false), 150);
  }

  protected escolher(p: Patient): void {
    clearTimeout(this.temporizador);
    this.termo.set('');
    this.listaAberta.set(false);
    this.preencherPaciente(p);
  }

  private preencherPaciente(p: Patient): void {
    this.paciente.set(p);
    this.form.update((f) => ({
      ...f,
      nome: p.name,
      cpf: p.cpf,
      nascimento: String(p.birthday ?? '').substring(0, 10),
      convenio: p.health?.healthInsurance ?? '',
    }));
  }

  // ---- Formulário ----

  protected atualizar<K extends keyof AtestadoForm>(campo: K, valor: AtestadoForm[K]): void {
    this.form.update((atual) => ({ ...atual, [campo]: valor }));
  }

  /** Início + dias definem o término; mexer no término recalcula os dias. */
  protected editarInicio(inicio: string): void {
    this.form.update((f) => {
      const dias = Number(f.dias);
      return { ...f, inicio, fim: inicio && dias > 0 ? somarDias(inicio, dias) : f.fim };
    });
  }

  protected editarDias(valor: string): void {
    this.form.update((f) => {
      const dias = Number(valor);
      return { ...f, dias: valor, fim: f.inicio && dias > 0 ? somarDias(f.inicio, dias) : f.fim };
    });
  }

  protected editarFim(fim: string): void {
    this.form.update((f) => {
      const dias = f.inicio && fim ? diasEntre(f.inicio, fim) : 0;
      return { ...f, fim, dias: dias > 0 ? String(dias) : f.dias };
    });
  }

  protected limpar(): void {
    this.paciente.set(null);
    this.form.set(formularioVazio());
  }

  protected imprimir(): void {
    window.print();
  }
}
