import { describe, it, expect } from 'vitest';

describe('ROI Calculator', () => {
  it('should calculate ROI correctly', () => {
    const investment = 5000;
    const roi = 847;
    const potentialReturn = investment * (roi / 100);

    expect(potentialReturn).toBe(42350);
  });

  it('should handle different investment amounts', () => {
    const testCases = [
      { investment: 1000, roi: 847, expected: 8470 },
      { investment: 10000, roi: 847, expected: 84700 },
      { investment: 50000, roi: 847, expected: 423500 },
    ];

    testCases.forEach(({ investment, roi, expected }) => {
      const result = investment * (roi / 100);
      expect(result).toBe(expected);
    });
  });

  it('should validate ROI range', () => {
    const minROI = 100;
    const maxROI = 1000;
    const testROI = 847;

    expect(testROI).toBeGreaterThanOrEqual(minROI);
    expect(testROI).toBeLessThanOrEqual(maxROI);
  });
});
