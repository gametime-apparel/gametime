import type { z } from 'zod';

export type NewStore = z.infer<typeof import('../zod').insertStoreSchema>;
export type UpdateStore = z.infer<typeof import('../zod').updateStoreSchema>;
