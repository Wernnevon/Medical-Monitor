export enum PrescriptionSatus {
  SUSPENDED = "Suspenso",
  ADMINISTERING = "Administrando",
}

type Prescription = {
  patientId: number;
  medicament: string;
  date: Date;
  administering: PrescriptionSatus;
  id: string;
};

export default Prescription;
