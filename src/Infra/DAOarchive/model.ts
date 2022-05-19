interface Endereco {
    cidade: string;
    bairro: string;
    rua: string;
    numero: number;
    complemento: string;
};

interface Exame {
    nome: string;
    data: Date;
    realizado: boolean;
};
interface Prescricao {
    medicamento: string;
    data: Date;
    administrando: boolean;
};

export default interface Patient {
    id?: string;
    nome: string;
    idade: number;
    endereco: Endereco;
    exames: Exame[];
    receitas: Prescricao[];
};
// trocar data de nascimento por idade
// add convenio
// add data de solicitação e de realização de exame
// add nome pai e mae