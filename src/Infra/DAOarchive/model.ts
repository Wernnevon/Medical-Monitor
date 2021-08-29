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
    nome: string;
    idade: number;
    endereco: Endereco;
    exames: Exame[];
    receitas: Prescricao[];
};