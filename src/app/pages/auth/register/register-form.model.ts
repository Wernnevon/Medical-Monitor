import type { Council } from '@domain/entities';
import { CouncilType, ProfessionalGender, ProfessionalRole } from '@domain/entities';
import type { DadosCadastro } from '@app/shared/services/auth';

export type RegisterForm = {
  role: string;
  name: string;
  gender: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone: string;
  specialty: string;
  councilType: string;
  councilNumber: string;
};

export const formularioVazio = (): RegisterForm => ({
  role: ProfessionalRole.PROFISSIONAL,
  name: '',
  gender: '',
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  specialty: '',
  councilType: CouncilType.CRM,
  councilNumber: '',
});

export function paraDadosCadastro(form: RegisterForm): DadosCadastro {
  const role = form.role as ProfessionalRole;
  const council: Council | null =
    role === ProfessionalRole.PROFISSIONAL
      ? { type: form.councilType as CouncilType, number: form.councilNumber.trim() }
      : null;

  return {
    name: form.name.trim(),
    username: form.username.trim(),
    password: form.password,
    phone: form.phone.trim(),
    role,
    specialty: form.specialty.trim(),
    council,
    gender: role === ProfessionalRole.PROFISSIONAL ? (form.gender as ProfessionalGender) : null,
  };
}
