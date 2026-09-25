import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { routes } from './app.routes';
import { dataProviders } from '@core/providers';
import { AuthService } from './shared/services/auth';
import { FIRESTORE, FIREBASE_AUTH, initializeFirebase } from '@infra/frameworks/firebase';

const { auth, firestore } = initializeFirebase();

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    { provide: FIRESTORE, useValue: firestore },
    { provide: FIREBASE_AUTH, useValue: auth },
    ...dataProviders,
    // Restaura a sessão antes da primeira navegação: sem isto, `authGuard`
    // rodaria contra um `AuthService` ainda sem saber se há usuário logado
    // e mandaria todo mundo para `/entrar` no primeiro carregamento.
    provideAppInitializer(() => inject(AuthService).restaurar()),
  ],
};
