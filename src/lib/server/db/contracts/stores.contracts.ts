import type { updateStoreSchema, insertStoreSchema } from '../zod/stores.zod.ts';
import { z } from 'zod';

export type NewStore = z.infer<typeof insertStoreSchema>;
export type UpdateStore = z.infer<typeof updateStoreSchema>;
