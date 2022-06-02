interface Address {
    city: string;
    neighborhood: string;
    street: string;
    number: number;
    complement?: string;
};

interface Exam {
    name: string;
    realizationDate: Date;
    requisitionDate: Date;
    done: boolean;
};
interface Prescription {
    medicament: string;
    date: Date;
    administering: boolean;
};

export default interface Patient {
    id?: string;
    name: string;
    birthday: Date
    helthInsurance: string;
    fatherName: string;
    motherName: string;
    adress: Address;
    exams: Exam[];
    medicament: Prescription[];
};