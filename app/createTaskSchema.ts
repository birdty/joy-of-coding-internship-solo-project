import { z } from 'zod';

export const createTaskSchema = z.object({
    name: z.string().min(1, 'min not').max(255),
    description: z.string().min(1, 'min desription not met').max(255),
    duedate: z.date()
});
