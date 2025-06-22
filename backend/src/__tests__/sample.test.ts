import { describe, it, expect } from 'vitest';

describe('Sample Test Suite', () => {
  it('should pass a simple addition test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should verify basic string operations', () => {
    const greeting = 'Hello';
    expect(greeting).toContain('ello');
    expect(greeting.length).toBe(5);
  });
});
