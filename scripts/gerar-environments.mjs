/**
 * Gera `src/environments/environment*.ts` a partir de variáveis de ambiente.
 *
 * Roda sozinho antes do `npm run build` (script `prebuild`). Na Vercel as
 * variáveis vêm do painel do projeto; na máquina local, se elas não estiverem
 * definidas, os arquivos que você já tem são mantidos.
 */
import { existsSync, writeFileSync } from 'node:fs';

const variaveis = {
  apiKey: 'FIREBASE_API_KEY',
  authDomain: 'FIREBASE_AUTH_DOMAIN',
  projectId: 'FIREBASE_PROJECT_ID',
  storageBucket: 'FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'FIREBASE_MESSAGING_SENDER_ID',
  appId: 'FIREBASE_APP_ID',
};

const dir = 'src/environments';
const arquivos = [`${dir}/environment.ts`, `${dir}/environment.development.ts`];
const faltando = Object.values(variaveis).filter((nome) => !process.env[nome]);

if (faltando.length > 0) {
  if (arquivos.every(existsSync)) {
    console.log('Variáveis do Firebase ausentes; usando os environment*.ts locais.');
    process.exit(0);
  }
  console.error(
    `Faltam variáveis de ambiente: ${faltando.join(', ')}.\n` +
      `Defina-as ou crie os arquivos a partir de ${dir}/environment.example.ts.`,
  );
  process.exit(1);
}

const firebaseConfig = Object.fromEntries(
  Object.entries(variaveis).map(([campo, nome]) => [campo, process.env[nome]]),
);

const conteudo = (production) =>
  `export const environment = ${JSON.stringify(
    { production, useEmulators: false, firebaseConfig },
    null,
    2,
  )};\n`;

writeFileSync(arquivos[0], conteudo(true));
writeFileSync(arquivos[1], conteudo(false));
console.log('environment*.ts gerados a partir das variáveis de ambiente.');
