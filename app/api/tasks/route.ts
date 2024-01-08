import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { createTaskSchema } from "../../createTaskSchema";

async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createTaskSchema.safeParse(body);
    if(!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400});
    }

    let taskId = body.taskId;

    if(taskId) {
        const task = await prisma.task.update({
            select: {
                name: true,
            },
            where: {
                id: taskId
            },
            data: {
                name: body.name
            }
        });

        return NextResponse.json(task, {status: 201});    
    } else {
        const newTask = await prisma.task.create({data: {name: body.name}});
        return NextResponse.json(newTask, {status: 201});    
    }
}

async function GET(request: NextRequest){
    let taskId = request.nextUrl.searchParams.get('taskId');

    if(taskId) {
        const task = await prisma.task.findUnique({
            where: {
                id: Number(taskId)
            }
        });
        return NextResponse.json({task});
    } else {
        const tasks = await prisma.task.findMany();
        return NextResponse.json({tasks})    
    }
}

async function DELETE(request: NextRequest) {
    let id = request.nextUrl.searchParams.get('id');

    await prisma.task.delete({
        where: {
          id: Number(id),
        }
    });

    const tasks = await prisma.task.findMany();
    return NextResponse.json({tasks})
}

export {GET, POST, DELETE}
