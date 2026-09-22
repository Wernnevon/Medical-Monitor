import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { form, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { Breadcrumb } from '@app/components/breadcrumb/breadcrumb';
import { Button } from '@app/components/button/button';
import { Field } from '@app/components/field/field';
import { Icon } from '@app/components/icon/icon';
import { PatientAdd, PatientFindById, PatientUpdate } from '@domain/tokens';
import { ToastService, ToastType } from '@app/services/toast';
import {
  daEntidade,
  formularioVazio,
  paraEntidade,
  type PatientForm,
} from './patient-form.model';
import { patientSchema } from './patient-form.schema';

const ETAPAS = [
  { titulo: 'Dados Pessoais' },
  { titulo: 'Endereço' },
  { titulo: 'Saúde' },
  { titulo: 'Conclusão' },
] as const;

@Component({
  selector: 'app-patient-register',
  imports: [Breadcrumb, Button, Field, Icon],
  templateUrl: './patient-register.html',
  styleUrl: './patient-register.scss',
})
export class PatientRegister {
  /** Vem da rota `pacientes/editar/:id` via `withComponentInputBinding`. */
  readonly id = input('');

  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly adicionar = inject(PatientAdd);
  private readonly atualizar = inject(PatientUpdate);
  private readonly buscar = inject(PatientFindById);

  protected readonly etapas = ETAPAS;
  protected readonly etapa = signal(0);
  protected readonly salvando = signal(false);

  protected readonly modelo = signal<PatientForm>(formularioVazio());
  protected readonly formulario = form(this.modelo, patientSchema);

  protected readonly edicao = computed(() => !!this.id());

  protected readonly breadcrumb = computed(() => [
    { label: 'Pacientes', path: '/pacientes' },
    { label: this.edicao() ? 'Editar' : 'Novo', path: '' },
  ]);

  constructor() {
    effect(() => {
      const id = this.id();
      if (!id) return;
      this.buscar
        .findById({ id })
        .then((patient) => this.modelo.set(daEntidade(patient)))
        .catch(() =>
          this.toast.add('Não foi possível carregar o paciente', ToastType.ERROR),
        );
    });
  }

  /**
   * Campos de cada etapa, para bloquear o avanço com pendência.
   *
   * O projeto React validava só no submit de cada step e, como o erro ficava
   * preso ao formulário daquele step, dava para chegar à conclusão com um
   * campo inválido para trás.
   */
  private readonly camposDaEtapa = computed(() => {
    const f = this.formulario;
    switch (this.etapa()) {
      case 0:
        return [f.name, f.motherName, f.fatherName, f.birthday, f.rg, f.cpf, f.gender];
      case 1:
        return [f.adress.street, f.adress.neighborhood, f.adress.city];
      case 2:
        return [f.health.allergy, f.health.weight, f.health.height];
      default:
        return [];
    }
  });

  protected readonly etapaValida = computed(() =>
    this.camposDaEtapa().every((campo) => campo().valid()),
  );

  protected readonly resumo = computed(() => this.modelo());

  protected avancar(): void {
    // Marcar como tocado é o que faz as mensagens aparecerem: antes disso o
    // campo nunca visitado está inválido mas em silêncio, de propósito.
    if (!this.etapaValida()) {
      this.camposDaEtapa().forEach((campo) => campo().markAsTouched());
      return;
    }
    this.etapa.update((i) => Math.min(i + 1, ETAPAS.length - 1));
  }

  protected voltar(): void {
    this.etapa.update((i) => Math.max(i - 1, 0));
  }

  protected irPara(indice: number): void {
    if (indice < this.etapa()) this.etapa.set(indice);
  }

  protected cancelar(): void {
    this.router.navigate(['/pacientes']);
  }

  protected async concluir(): Promise<void> {
    this.salvando.set(true);
    await submit(this.formulario, async (f) => {
      const dados = paraEntidade(f().value(), this.id());
      try {
        if (this.edicao()) {
          await this.atualizar.update({ data: dados });
          this.toast.add(
            'Dados do paciente foram atualizados com sucesso',
            ToastType.SUCESS,
          );
        } else {
          await this.adicionar.store({ data: dados });
          this.toast.add('Paciente cadastrado com sucesso', ToastType.SUCESS);
        }
        this.router.navigate(['/pacientes']);
      } catch {
        this.toast.add(
          this.edicao() ? 'Erro na atualização' : 'Erro no cadastro',
          ToastType.ERROR,
        );
      }
      return undefined;
    });
    this.salvando.set(false);
  }
}
