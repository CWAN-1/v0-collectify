import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const priceHistory = await prisma.priceHistory.findMany({
      where: { listingId: id },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(priceHistory);
  } catch (error) {
    console.error('Error fetching price history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch price history' },
      { status: 500 }
    );
  }
}
