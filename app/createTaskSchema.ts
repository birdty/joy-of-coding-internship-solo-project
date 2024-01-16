import { z } from 'zod';

export const createTaskSchema = z.object({
    name: z.string().min(5, 'name needs to be a minimum 5 characters').max(255),
    description: z.string().min(1, 'desription required').max(255)
});
