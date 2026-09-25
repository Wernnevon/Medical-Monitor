import { Component, inject, signal } from '@angular/core';
import { required, schema, form, submit } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { Logo } from '@app/shared/components/logo/logo';
import { ThemeToggle } from '@app/shared/components/theme-toggle/theme-toggle';
import { Button } from '@app/shared/components/button/button';
import { Field } from '@app/shared/components/field/field';
import { PasswordField } from '@app/shared/components/password-field/password-field';
import { AuthService } from '@app/shared/services/auth';

type LoginForm = {
  username: string;
  password: string;
};

const loginSchema = schema<LoginForm>((f) => {
  required(f.username, { message: 'Informe o usuário' });
  required(f.password, { message: 'Informe a senha' });
});

@Component({
  selector: 'app-login',
  imports: [Logo, ThemeToggle, Button, Field, PasswordField, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  protected readonly modelo = signal<LoginForm>({ username: '', password: '' });
  protected readonly formulario = form(this.modelo, loginSchema);

  protected readonly entrando = signal(false);
  protected readonly erro = signal('');

  protected async entrar(): Promise<void> {
    this.entrando.set(true);
    this.erro.set('');
    await submit(this.formulario, async (f) => {
      const { username, password } = f().value();
      try {
        await this.auth.entrar(username, password);
        this.router.navigate(['/pacientes']);
      } catch (error) {
        this.erro.set(error instanceof Error ? error.message : 'Não foi possível entrar');
      }
      return undefined;
    });
    this.entrando.set(false);
  }
}
