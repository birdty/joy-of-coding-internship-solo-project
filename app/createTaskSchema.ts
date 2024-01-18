import { z } from 'zod';

export const createTaskSchema = z.object({
    name: z.string().min(5, '5 characters required in name').max(255),
    description: z.string().min(10, '10 character description required').max(255)
});
