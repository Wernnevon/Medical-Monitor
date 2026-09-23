import { minLength, required, schema, validate } from '@angular/forms/signals';
import { ProfessionalRole } from '@domain/entities';
import { MASCARAS } from '@core/utils/masks';
import type { RegisterForm } from './register-form.model';

/** Só quem prescreve (role profissional) precisa de conselho de classe. */
const ehProfissional = (valor: string) => valor === ProfessionalRole.PROFISSIONAL;

export const registerSchema = schema<RegisterForm>((f) => {
  required(f.role, { message: 'Selecione o tipo de acesso' });
  required(f.name, { message: 'Informe o nome completo' });

  required(f.username, { message: 'Informe um usuário de acesso' });
  minLength(f.username, 3, { message: 'O usuário precisa de ao menos 3 caracteres' });
  validate(f.username, ({ value }) =>
    !value() || /^\S+$/.test(value())
      ? undefined
      : { kind: 'usuario-espaco', message: 'O usuário não pode ter espaços' },
  );

  required(f.password, { message: 'Crie uma senha' });
  minLength(f.password, 6, { message: 'A senha precisa de ao menos 6 caracteres' });

  required(f.confirmPassword, { message: 'Confirme a senha' });
  validate(f.confirmPassword, ({ value, valueOf }) =>
    value() && value() !== valueOf(f.password)
      ? { kind: 'senha-diferente', message: 'As senhas não conferem' }
      : undefined,
  );

  required(f.phone, { message: 'Informe o telefone' });
  validate(f.phone, ({ value }) =>
    !value() || MASCARAS.telefone(value()).replace(/\D/g, '').length >= 10
      ? undefined
      : { kind: 'telefone', message: 'Telefone incompleto' },
  );

  required(f.gender, {
    message: 'Selecione o gênero',
    when: ({ valueOf }) => ehProfissional(valueOf(f.role)),
  });

  required(f.specialty, {
    message: 'Informe a especialidade',
    when: ({ valueOf }) => ehProfissional(valueOf(f.role)),
  });

  required(f.councilType, {
    message: 'Selecione o conselho de classe',
    when: ({ valueOf }) => ehProfissional(valueOf(f.role)),
  });

  required(f.councilNumber, {
    message: 'Informe o número de registro no conselho',
    when: ({ valueOf }) => ehProfissional(valueOf(f.role)),
  });
});
