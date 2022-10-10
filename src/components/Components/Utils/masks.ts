function CPFMask(value: string): string {
  return value
    .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

function RgMask(value: string): string {
  return value.replace(/\D/g, "").replace(/(\d{7})\d+?$/, "$1"); // captura 4 numeros seguidos de um traço e não deixa ser digitado mais nada;
}

function PhoneMask(value: string): string {
  console.log("phone");
  return value
    .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
    .replace(/^(\d{2})(\d)/g, "($1) $2") // add parentesis nos dois primeiros numeros
    .replace(/(\d{5})(\d)/, "$1-$2") // add hifen entre o 4º e 0 5º número
    .replace(/(-\d{4})\d+?$/, "$1"); // captura 4 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export default function formatValue(type: string, value: string): string {
  let retunedValue = "";
  switch (type) {
    case "cpf":
      retunedValue = CPFMask(value);
      break;
    case "rg":
      retunedValue = RgMask(value);
      break;
    case "phone":
      retunedValue = PhoneMask(value);
      break;
  }
  return retunedValue;
}
