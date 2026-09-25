import { Component, computed, inject, input } from '@angular/core';
import type { Patient } from '@domain/entities';
import { PatientDetailsFacade } from '../patient-details-facade';
import { ClinicalIndicators } from './clinical-indicators';
import { MeasurementForm } from './measurement-form';
import { MeasurementHistory } from './measurement-history';
import { patientReadings } from './measurement-types';

/**
 * Aba "Dados Clínicos" do prontuário, em três planos: o resumo do estado
 * atual, o registro de uma medida nova e o histórico. As leituras vêm do
 * paciente carregado pelo facade — depois de registrar ou excluir, basta
 * recarregá-lo pra indicadores e histórico refletirem a mudança juntos.
 */
@Component({
  selector: 'app-clinical-data',
  imports: [ClinicalIndicators, MeasurementForm, MeasurementHistory],
  template: `
    <app-clinical-indicators [patient]="patient()" [readings]="leituras()" />
    <app-measurement-form [patient]="patient()" (registered)="facade.reloadPatient()" />
    <app-measurement-history
      [patient]="patient()"
      [readings]="leituras()"
      (removed)="facade.reloadPatient()"
    />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--esp-6);
      padding-top: var(--esp-2);
    }
  `,
})
export class ClinicalData {
  readonly patient = input.required<Patient>();

  protected readonly facade = inject(PatientDetailsFacade);

  protected readonly leituras = computed(() => patientReadings(this.patient()));
}
