export enum PrescriptionSatus {
  SUSPENDED = "Suspenso",
  ADMINISTERING = "Administrando",
}

type Prescription = {
  patientId: number;
  medicament: string;
  date: Date;
  administering: PrescriptionSatus;
  id: number;
};

export default Prescription;
