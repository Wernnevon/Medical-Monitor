import type { SelectOption } from '@app/shared/components/select/select';
import { CouncilType, ProfessionalGender, ProfessionalRole } from '@domain/entities';

export const ROLE_OPTIONS: SelectOption[] = [
  { value: ProfessionalRole.PROFISSIONAL, label: 'Profissional' },
  { value: ProfessionalRole.ASSISTENTE, label: 'Assistente' },
];

/** Só decide "Dr." ou "Dra." no timbrado impresso — ver `ProfessionalGender`. */
export const GENDER_OPTIONS: SelectOption[] = [
  { value: ProfessionalGender.MASCULINO, label: 'Masculino (Dr.)' },
  { value: ProfessionalGender.FEMININO, label: 'Feminino (Dra.)' },
];

export const COUNCIL_OPTIONS: SelectOption[] = [
  { value: CouncilType.CRM, label: 'CRM — Medicina' },
  { value: CouncilType.CRO, label: 'CRO — Odontologia' },
  { value: CouncilType.CRF, label: 'CRF — Farmácia' },
  { value: CouncilType.COREN, label: 'COREN — Enfermagem' },
  { value: CouncilType.CREFITO, label: 'CREFITO — Fisioterapia e T.O.' },
  { value: CouncilType.CRP, label: 'CRP — Psicologia' },
  { value: CouncilType.CRN, label: 'CRN — Nutrição' },
  { value: CouncilType.CRBM, label: 'CRBM — Biomedicina' },
  { value: CouncilType.CRFa, label: 'CRFa — Fonoaudiologia' },
  { value: CouncilType.CRESS, label: 'CRESS — Serviço Social' },
];
