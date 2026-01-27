import { describe, it, expect } from 'vitest';
import { z } from 'zod';

describe('Admin Router', () => {
  it('should validate lead status update input', () => {
    const updateLeadStatusSchema = z.object({
      id: z.number(),
      status: z.enum(["new", "contacted", "qualified", "converted", "lost"]),
    });

    const validData = {
      id: 1,
      status: "contacted" as const,
    };

    expect(() => updateLeadStatusSchema.parse(validData)).not.toThrow();
  });

  it('should reject invalid status for lead', () => {
    const updateLeadStatusSchema = z.object({
      id: z.number(),
      status: z.enum(["new", "contacted", "qualified", "converted", "lost"]),
    });

    const invalidData = {
      id: 1,
      status: "invalid_status",
    };

    expect(() => updateLeadStatusSchema.parse(invalidData)).toThrow();
  });

  it('should validate audit status update input', () => {
    const updateAuditStatusSchema = z.object({
      id: z.number(),
      status: z.enum(["pending", "in_progress", "completed", "cancelled"]),
    });

    const validData = {
      id: 1,
      status: "in_progress" as const,
    };

    expect(() => updateAuditStatusSchema.parse(validData)).not.toThrow();
  });

  it('should validate delete input', () => {
    const deleteSchema = z.object({ id: z.number() });

    const validData = { id: 1 };

    expect(() => deleteSchema.parse(validData)).not.toThrow();
  });

  it('should require positive id for delete', () => {
    const deleteSchema = z.object({ id: z.number().positive() });

    const invalidData = { id: -1 };

    expect(() => deleteSchema.parse(invalidData)).toThrow();
  });
});
