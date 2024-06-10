export function getAge(date: Date) {
  const today = new Date();
  const birthday = new Date(date);
  return Math.floor(
    Math.ceil(
      Math.abs(birthday.getTime() - today.getTime()) / (1000 * 3600 * 24)
    ) / 365.25
  );
}

export function formmatDate(date: Date): string {
  const [y, m, d] = date.toString().split("-");
  return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString();
}

export function getStringToday(): string {
  return new Date(Date.now()).toISOString().substring(0, 10);
}
