/**
 * Utilidades de data compartilhadas.
 *
 * Vivem em `core/` e não em `presentation/` porque `infra/repositories/put`
 * também depende de `getStringToday` (ver `changeStatus` de exame). No projeto
 * React original este arquivo ficava sob `Presentation/Utils`, o que fazia a
 * camada mais externa depender da mais interna — invertendo a regra de
 * dependência da arquitetura.
 */

export function getAge(date: Date): number {
  const today = new Date();
  const birthday = new Date(date);
  return Math.floor(
    Math.ceil(
      Math.abs(birthday.getTime() - today.getTime()) / (1000 * 3600 * 24),
    ) / 365.25,
  );
}

export function formmatDate(date: Date): string {
  const [y, m, d] = date.toString().split('-');
  return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString();
}

export function getStringToday(): string {
  return new Date(Date.now()).toISOString().substring(0, 10);
}

/** Carimbo de tempo de escrita, usado para resolução de conflito no sync. */
export function nowTimestamp(): string {
  return new Date().toISOString();
}
