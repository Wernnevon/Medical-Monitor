import { Component, computed, effect, inject, signal } from '@angular/core';
import { form, submit } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { Button } from '@app/shared/components/button/button';
import { Field } from '@app/shared/components/field/field';
import { PasswordField } from '@app/shared/components/password-field/password-field';
import { Select } from '@app/shared/components/select/select';
import { AuthService } from '@app/shared/services/auth';
import { ProfessionalRole } from '@domain/entities';
import { COUNCIL_OPTIONS, GENDER_OPTIONS, ROLE_OPTIONS } from './council-options';
import { formularioVazio, paraDadosCadastro } from './register-form.model';
import { registerSchema } from './register-form.schema';

@Component({
  selector: 'app-register',
  imports: [Button, Field, PasswordField, Select, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  protected readonly roleOptions = ROLE_OPTIONS;
  protected readonly councilOptions = COUNCIL_OPTIONS;
  protected readonly genderOptions = GENDER_OPTIONS;

  protected readonly modelo = signal(formularioVazio());
  protected readonly formulario = form(this.modelo, registerSchema);

  protected readonly cadastrando = signal(false);
  protected readonly erro = signal('');

  protected readonly ehProfissional = computed(
    () => this.modelo().role === ProfessionalRole.PROFISSIONAL,
  );

  constructor() {
    // Conveniência: sugere o usuário de acesso a partir do conselho, já que
    // o profissional normalmente vai preencher com o próprio registro.
    // Só enquanto o campo não foi tocado — depois disso, o que a pessoa
    // digitou manualmente prevalece.
    effect(() => {
      const { role, councilType, councilNumber, username } = this.modelo();
      if (role !== ProfessionalRole.PROFISSIONAL) return;
      if (this.formulario.username().touched()) return;

      const numero = councilNumber.trim();
      if (!numero) return;

      const sugestao = `${councilType}${numero}`;
      if (sugestao === username) return;
      this.modelo.update((atual) => ({ ...atual, username: sugestao }));
    });
  }

  protected async cadastrar(): Promise<void> {
    this.cadastrando.set(true);
    this.erro.set('');
    await submit(this.formulario, async (f) => {
      try {
        await this.auth.cadastrar(paraDadosCadastro(f().value()));
        this.router.navigate(['/pacientes']);
      } catch (error) {
        this.erro.set(
          error instanceof Error ? error.message : 'Não foi possível concluir o cadastro',
        );
      }
      return undefined;
    });
    this.cadastrando.set(false);
  }
}
