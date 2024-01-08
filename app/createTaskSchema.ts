import { z } from 'zod';

export const createTaskSchema = z.object({
    name: z.string().min(1, 'min not').max(255)
});
