export enum PrescriptionStatus {
  SUSPENDED = "Suspenso",
  ADMINISTERING = "Administrando",
}

type Prescription = {
  patientId: number;
  medicament: string;
  date: Date;
  status: PrescriptionStatus;
  id: number;
};

export default Prescription;
