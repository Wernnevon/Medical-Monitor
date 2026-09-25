import { InjectionToken } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  connectFirestoreEmulator,
  type Firestore,
} from 'firebase/firestore';
import { connectAuthEmulator } from 'firebase/auth';
import { environment } from '../../environments/environment';

export const FIRESTORE = new InjectionToken<Firestore>('FIRESTORE');
export const FIREBASE_AUTH = new InjectionToken<Auth>('FIREBASE_AUTH');

export function initializeFirebase() {
  const app = initializeApp(environment.firebaseConfig);
  
  const auth = getAuth(app);
  const firestore = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    }),
    ignoreUndefinedProperties: true,
  });

  if (environment.useEmulators) {
    // Portas padrão dos emuladores do Firebase
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
  }

  return { app, auth, firestore };
}
