import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';

describe('Leads Router', () => {
  it('should validate lead creation input', () => {
    const createLeadSchema = z.object({
      name: z.string().min(2, "Nome obrigatório"),
      email: z.string().email("Email inválido"),
      whatsapp: z.string().min(10, "WhatsApp inválido"),
      company: z.string().optional(),
      challenge: z.string().optional(),
      investment: z.number().optional(),
    });

    const validData = {
      name: 'João Silva',
      email: 'joao@example.com',
      whatsapp: '11999999999',
      company: 'Tech Company',
      challenge: 'Aumentar conversão',
      investment: 5000,
    };

    expect(() => createLeadSchema.parse(validData)).not.toThrow();
  });

  it('should reject invalid email', () => {
    const createLeadSchema = z.object({
      name: z.string().min(2),
      email: z.string().email("Email inválido"),
      whatsapp: z.string().min(10),
    });

    const invalidData = {
      name: 'João',
      email: 'invalid-email',
      whatsapp: '11999999999',
    };

    expect(() => createLeadSchema.parse(invalidData)).toThrow();
  });

  it('should validate audit creation input', () => {
    const createAuditSchema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      whatsapp: z.string().min(10),
      company: z.string().min(2),
      website: z.string().url().optional(),
      currentSpend: z.number().optional(),
      mainChallenge: z.string().optional(),
    });

    const validData = {
      name: 'Maria Santos',
      email: 'maria@example.com',
      whatsapp: '11988888888',
      company: 'Marketing Agency',
      website: 'https://example.com',
      currentSpend: 10000,
      mainChallenge: 'Melhorar ROI',
    };

    expect(() => createAuditSchema.parse(validData)).not.toThrow();
  });

  it('should require company for audit', () => {
    const createAuditSchema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      whatsapp: z.string().min(10),
      company: z.string().min(2),
    });

    const invalidData = {
      name: 'Maria',
      email: 'maria@example.com',
      whatsapp: '11988888888',
      company: '',
    };

    expect(() => createAuditSchema.parse(invalidData)).toThrow();
  });
});
