import { describe, expect, it } from "vitest";
import { appRouter } from "../routers";

describe("newsletter", () => {
  it("should subscribe to newsletter", async () => {
    const caller = appRouter.createCaller({} as any);

    const result = await caller.newsletter.subscribe({
      email: "test@example.com",
      name: "Test User",
      source: "blog",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("sucesso");
  });

  it("should handle duplicate subscription", async () => {
    const caller = appRouter.createCaller({} as any);

    // First subscription
    await caller.newsletter.subscribe({
      email: "duplicate@example.com",
      name: "Test User",
    });

    // Second subscription with same email
    const result = await caller.newsletter.subscribe({
      email: "duplicate@example.com",
      name: "Test User",
    });

    expect(result.success).toBe(true);
  });

  it("should validate email format", async () => {
    const caller = appRouter.createCaller({} as any);

    try {
      await caller.newsletter.subscribe({
        email: "invalid-email",
        name: "Test User",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should get newsletter stats", async () => {
    const caller = appRouter.createCaller({} as any);

    const stats = await caller.newsletter.getStats();

    expect(stats).toHaveProperty("totalSubscribers");
    expect(typeof stats.totalSubscribers).toBe("number");
  });

  it("should unsubscribe from newsletter", async () => {
    const caller = appRouter.createCaller({} as any);

    // Subscribe first
    await caller.newsletter.subscribe({
      email: "unsubscribe@example.com",
      name: "Test User",
    });

    // Then unsubscribe
    const result = await caller.newsletter.unsubscribe({
      email: "unsubscribe@example.com",
    });

    expect(result.success).toBe(true);
  });
});
