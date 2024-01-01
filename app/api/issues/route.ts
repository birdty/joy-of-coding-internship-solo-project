import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
    name: z.string().min(1).max(255)
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400});
    }

    const newIssue = await prisma.task.create({
        data: {
            name: body.name
        }
    });

    return NextResponse.json(newIssue, {status: 201});
}