import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const weekYear = parseInt(searchParams.get('weekYear') || '');
    const weekNumber = parseInt(searchParams.get('weekNumber') || '');

    if (!weekYear || !weekNumber) {
      return NextResponse.json(
        { success: false, error: 'weekYear e weekNumber são obrigatórios' },
        { status: 400 }
      );
    }

    const goals = await prisma.weeklyGoal.findMany({
      where: {
        weekYear,
        weekNumber,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: goals,
    });
  } catch (error) {
    console.error('Erro ao buscar metas semanais:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, weekYear, weekNumber } = body;

    if (!title || !weekYear || !weekNumber) {
      return NextResponse.json(
        { success: false, error: 'title, weekYear e weekNumber são obrigatórios' },
        { status: 400 }
      );
    }

    const goal = await prisma.weeklyGoal.create({
      data: {
        title,
        description,
        weekYear,
        weekNumber,
      },
    });

    return NextResponse.json({
      success: true,
      data: goal,
    });
  } catch (error) {
    console.error('Erro ao criar meta semanal:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, completed } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID é obrigatório' },
        { status: 400 }
      );
    }

    const updateData: {
      title?: string;
      description?: string;
      completed?: boolean;
      completedAt?: Date | null;
    } = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) {
      updateData.completed = completed;
      updateData.completedAt = completed ? new Date() : null;
    }

    const goal = await prisma.weeklyGoal.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: goal,
    });
  } catch (error) {
    console.error('Erro ao atualizar meta semanal:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID é obrigatório' },
        { status: 400 }
      );
    }

    await prisma.weeklyGoal.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Meta removida com sucesso',
    });
  } catch (error) {
    console.error('Erro ao remover meta semanal:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
