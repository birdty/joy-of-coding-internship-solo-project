import { z } from 'zod';

export const createIssueSchema = z.object({
    name: z.string().min(1, 'min not').max(255)
});
