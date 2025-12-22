import { expect } from 'vitest';
import type { ZodType } from 'zod';

// @ts-expect-error unknown result
export const expectZodError = (result, ERR: { message: string }) => {
	expect(result.success).toBe(false);
	if (!result.success) {
		// @ts-expect-error unknown result
		expect(result.error.issues.some((i) => i.message === ERR.message)).toBe(true);
	}
};

export function expectSchema<T>(schema: ZodType, data: unknown): asserts data is T {
	expect(() => schema.parse(data)).not.toThrow();
}
