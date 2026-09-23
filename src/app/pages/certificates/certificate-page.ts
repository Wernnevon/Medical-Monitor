import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@app/shared/components/button/button';
import { Icon } from '@app/shared/components/icon/icon';
import { PrintOutput } from '@app/shared/components/print-output/print-output';
import { getLocalDateInput } from '@core/utils/date-utils';

type AtestadoForm = {
  patientName: string;
  cid: string;
  days: string;
  date: string;
  city: string;
  state: string;
};

const vazio = (): AtestadoForm => ({
  patientName: '',
  cid: '',
  days: '1',
  date: getLocalDateInput(),
  city: '',
  state: '',
});

/**
 * Atestado médico — espelha `legacy/src/Presentation/Pages/Atestado`.
 *
 * Sem entidade de domínio nem persistência, igual ao legado: é um formulário
 * de preenchimento livre para gerar o texto e imprimir, não um registro que
 * sobrevive entre sessões.
 */
@Component({
  selector: 'app-certificate-page',
  imports: [Button, Icon, PrintOutput, RouterLink],
  templateUrl: './certificate-page.html',
  styleUrl: './certificate-page.scss',
})
export class CertificatePage {
  protected readonly form = signal<AtestadoForm>(vazio());

  protected readonly preenchido = computed(() => {
    const { patientName, cid, city, state } = this.form();
    return Boolean(patientName || cid || city || state);
  });

  protected atualizar<K extends keyof AtestadoForm>(campo: K, valor: string): void {
    this.form.update((atual) => ({ ...atual, [campo]: valor }));
  }

  protected limpar(): void {
    this.form.set(vazio());
  }
}
