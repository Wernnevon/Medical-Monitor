import { Component, computed, input } from '@angular/core';
import type { Patient } from '@domain/entities';
import {
  MEASUREMENT_TYPES,
  formatMeasurementValue,
  splitMeasuredAt,
  type PatientReading,
} from './measurement-types';

/**
 * Resumo de leitura rápida: medidas do cadastro (peso, altura, IMC, tipo
 * sanguíneo) e a leitura mais recente de cada sinal vital. Só exibe — o
 * registro acontece no formulário logo abaixo, e peso/altura continuam
 * vindo do "Editar Dados".
 */
@Component({
  selector: 'app-clinical-indicators',
  template: `
    <section class="indicadores" aria-labelledby="indicadores-titulo">
      <h3 id="indicadores-titulo">Indicadores atuais</h3>

      <dl class="grade">
        @for (item of corporais(); track item.rotulo) {
          <div class="item">
            <dt>{{ item.rotulo }}</dt>
            <dd>
              @if (item.valor) {
                <span class="valor">{{ item.valor }}</span>
                @if (item.unidade) {
                  <span class="unidade">{{ item.unidade }}</span>
                }
              } @else {
                <span class="valor valor--vazio">—</span>
                <span class="sr-only">Não informado</span>
              }
            </dd>
          </div>
        }
      </dl>

      <dl class="grade grade--vitais">
        @for (item of vitais(); track item.rotulo) {
          <div class="item item--vital">
            <dt>{{ item.rotulo }}</dt>
            <dd>
              @if (item.valor) {
                <span class="valor">{{ item.valor }}</span>
                <span class="quando">{{ item.quando }}</span>
              } @else {
                <span class="valor valor--vazio">—</span>
                <span class="quando">Sem registro</span>
              }
            </dd>
          </div>
        }
      </dl>
    </section>
  `,
  styleUrl: './clinical-indicators.scss',
})
export class ClinicalIndicators {
  readonly patient = input.required<Patient>();
  readonly readings = input.required<PatientReading[]>();

  /** IMC calculado — peso/altura já existem no cadastro, então não é dado
   *  inventado, só uma conta em cima do que o paciente informou. */
  private readonly imc = computed(() => {
    const { weight, height } = this.patient().health;
    if (!weight || !height) return null;
    const metros = height / 100;
    return (weight / (metros * metros)).toFixed(1).replace('.', ',');
  });

  protected readonly corporais = computed(() => {
    const { weight, height, bloodType } = this.patient().health;
    return [
      { rotulo: 'Peso', valor: weight ? String(weight) : null, unidade: 'kg' },
      { rotulo: 'Altura', valor: height ? String(height) : null, unidade: 'cm' },
      { rotulo: 'IMC', valor: this.imc(), unidade: 'kg/m²' },
      { rotulo: 'Tipo sanguíneo', valor: bloodType || null, unidade: '' },
    ];
  });

  /** `readings` já chega ordenado do mais recente pro mais antigo, então a
   *  primeira ocorrência de cada tipo é a leitura atual daquele sinal. */
  protected readonly vitais = computed(() =>
    MEASUREMENT_TYPES.map((tipo) => {
      const ultima = this.readings().find(({ type }) => type.kind === tipo.kind);
      if (!ultima) return { rotulo: tipo.label, valor: null, quando: null };
      const { data, hora } = splitMeasuredAt(ultima.reading.measuredAt);
      return {
        rotulo: tipo.label,
        valor: formatMeasurementValue(tipo, ultima.reading.value),
        quando: `${data} às ${hora}`,
      };
    }),
  );
}
