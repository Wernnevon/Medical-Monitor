// Modelo dos arquivos de ambiente. Copie para environment.ts (produção) e
// environment.development.ts (dev, com production: false) e preencha com a
// config do app web no console do Firebase. Esses arquivos não vão pro git.
export const environment = {
  production: true,
  useEmulators: false,
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  },
};
