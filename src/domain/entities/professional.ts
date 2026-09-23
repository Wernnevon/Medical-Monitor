import type Syncable from './syncable';

/**
 * Duas roles por hora: profissional tem acesso completo, assistente só
 * gerencia pacientes. Prescrição, exame e atestado exigem o registro no
 * conselho de classe — algo que só faz sentido para quem de fato prescreve.
 */
export enum ProfessionalRole {
  PROFISSIONAL = 'profissional',
  ASSISTENTE = 'assistente',
}

/** Principais conselhos de classe da saúde no Brasil. */
export enum CouncilType {
  CRM = 'CRM',
  CRO = 'CRO',
  CRF = 'CRF',
  COREN = 'COREN',
  CREFITO = 'CREFITO',
  CRP = 'CRP',
  CRN = 'CRN',
  CRBM = 'CRBM',
  CRFa = 'CRFa',
  CRESS = 'CRESS',
}

export type Council = {
  type: CouncilType;
  number: string;
};

/** Só existe pra decidir "Dr." ou "Dra." no timbrado impresso — não é um
 *  dado clínico nem aparece em nenhum outro lugar da interface. */
export enum ProfessionalGender {
  MASCULINO = 'masculino',
  FEMININO = 'feminino',
}

/**
 * Conta de acesso ao sistema — pessoa física, não paciente.
 *
 * Fica numa store própria (`professionals`), separada de `patients` no mesmo
 * banco: são agregados diferentes, com ciclo de vida e regras de acesso
 * próprios.
 */
type Professional = Syncable & {
  name: string;
  /** Login. Texto livre e único — não é e-mail: o profissional costuma
   *  preencher com o próprio registro no conselho, mas o assistente (que
   *  não tem conselho) precisa de algo para entrar também. */
  username: string;
  passwordHash: string;
  phone?: string;
  role: ProfessionalRole;
  specialty?: string;
  /** Só existe para quem prescreve — a role `ASSISTENTE` não tem conselho. */
  council?: Council;
  gender?: ProfessionalGender;
};

export default Professional;
