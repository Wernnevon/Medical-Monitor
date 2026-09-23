/**
 * Hash de senha com SHA-256 via Web Crypto.
 *
 * Não é bcrypt/argon2 — não há servidor para carregar um KDF lento, e a senha
 * nunca sai do dispositivo. O objetivo aqui é só não gravar a senha em texto
 * puro no IndexedDB local; não substitui autenticação de verdade quando este
 * app ganhar um backend.
 */
export async function hashPassword(password: string): Promise<string> {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
