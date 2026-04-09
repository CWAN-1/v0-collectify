import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const testConnection = await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlFirstChars: process.env.DATABASE_URL?.substring(0, 50) + '...',
      nodeEnv: process.env.NODE_ENV,
      databaseConnected: true,
      testConnection,
    });
  } catch (error) {
    return NextResponse.json({
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlFirstChars: process.env.DATABASE_URL?.substring(0, 50) + '...',
      nodeEnv: process.env.NODE_ENV,
      databaseConnected: false,
      error: String(error),
    });
  }
}
