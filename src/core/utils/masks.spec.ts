import { describe, expect, it } from 'vitest';
import { mascaraCPF, mascaraRG, mascaraTelefone, somenteDigitos } from './masks';

describe('máscaras de entrada', () => {
  describe('telefone', () => {
    it('formata celular de 9 dígitos', () => {
      expect(mascaraTelefone('81999998888')).toBe('(81) 99999-8888');
    });

    it('formata fixo de 8 dígitos', () => {
      expect(mascaraTelefone('8133334444')).toBe('(81) 3333-4444');
    });

    it('não abre parêntese antes de haver número após o DDD', () => {
      expect(mascaraTelefone('81')).toBe('81');
      expect(mascaraTelefone('819')).toBe('(81) 9');
    });

    it('descarta dígitos além do 11º', () => {
      expect(mascaraTelefone('819999988889999')).toBe('(81) 99999-8888');
    });

    it('é idempotente', () => {
      const uma = mascaraTelefone('81999998888');
      expect(mascaraTelefone(uma)).toBe(uma);
    });
  });

  describe('CPF', () => {
    it('formata os 11 dígitos', () => {
      expect(mascaraCPF('12345678909')).toBe('123.456.789-09');
    });

    it('formata parcialmente enquanto se digita', () => {
      expect(mascaraCPF('123')).toBe('123');
      expect(mascaraCPF('1234')).toBe('123.4');
    });

    it('é idempotente', () => {
      expect(mascaraCPF('123.456.789-09')).toBe('123.456.789-09');
    });
  });

  describe('RG', () => {
    it('mantém no máximo 7 dígitos', () => {
      expect(mascaraRG('123456789')).toBe('1234567');
    });

    it('descarta o que não for dígito', () => {
      expect(mascaraRG('12.345-67')).toBe('1234567');
    });
  });

  it('somenteDigitos extrai os números do valor mascarado', () => {
    expect(somenteDigitos('123.456.789-09')).toBe('12345678909');
    expect(somenteDigitos('(81) 99999-8888')).toBe('81999998888');
  });
});
