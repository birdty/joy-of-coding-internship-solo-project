import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../createIssueSchema";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400});
    }

    const newIssue = await prisma.task.create({
        data: {
            name: body.name
        }
    });

    return NextResponse.json(newIssue, {status: 201});
}