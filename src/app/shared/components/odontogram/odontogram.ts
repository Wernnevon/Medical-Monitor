import { Component, computed, input, output } from '@angular/core';
import { Icon } from '../icon/icon';

export type Denticao = 'permanente' | 'decidua' | 'mista';

type Fileira = { titulo: string; direita: number[]; esquerda: number[] };
type Arcada = { titulo: string; fileiras: Fileira[] };

const intervalo = (de: number, ate: number): number[] => {
  const passo = de <= ate ? 1 : -1;
  return Array.from({ length: Math.abs(ate - de) + 1 }, (_, i) => de + i * passo);
};

/** Numeração FDI na vista do profissional de frente para o paciente: o
 *  lado direito do paciente fica à esquerda da tela, e cada fileira vai
 *  do dente mais posterior até a linha média e de volta. */
const PERMANENTES: Arcada = {
  titulo: 'Dentes permanentes',
  fileiras: [
    { titulo: 'Arco superior', direita: intervalo(18, 11), esquerda: intervalo(21, 28) },
    { titulo: 'Arco inferior', direita: intervalo(48, 41), esquerda: intervalo(31, 38) },
  ],
};

const DECIDUOS: Arcada = {
  titulo: 'Dentes decíduos',
  fileiras: [
    { titulo: 'Arco superior', direita: intervalo(55, 51), esquerda: intervalo(61, 65) },
    { titulo: 'Arco inferior', direita: intervalo(85, 81), esquerda: intervalo(71, 75) },
  ],
};

const ARCADAS: Record<Denticao, Arcada[]> = {
  permanente: [PERMANENTES],
  decidua: [DECIDUOS],
  mista: [PERMANENTES, DECIDUOS],
};

/** Dentes que existem numa dentição — para descartar os que sobraram ao
 *  trocar, por exemplo, de odontograma adulto para infantil. */
export function dentesDaDenticao(denticao: Denticao): Set<number> {
  return new Set(
    ARCADAS[denticao].flatMap((a) => a.fileiras.flatMap((f) => [...f.direita, ...f.esquerda])),
  );
}

/**
 * Odontograma — seleção visual de dentes pela numeração FDI. Emite só o
 * dente clicado; quem usa decide o que fazer com a seleção.
 */
@Component({
  selector: 'app-odontogram',
  imports: [Icon],
  templateUrl: './odontogram.html',
  styleUrl: './odontogram.scss',
})
export class Odontogram {
  readonly selecionados = input.required<ReadonlySet<number>>();
  readonly denticao = input<Denticao>('permanente');
  readonly denteToggle = output<number>();

  protected readonly arcadas = computed(() => ARCADAS[this.denticao()]);
}
