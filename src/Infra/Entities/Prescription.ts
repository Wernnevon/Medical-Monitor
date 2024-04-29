export enum PrescriptionSatus {
  SUSPENDED = "Suspenso",
  ADMINISTERING = "Administrando",
}

type Prescription = {
  patientId: string;
  medicament: string;
  date: Date;
  administering: PrescriptionSatus;
};

export default Prescription;
