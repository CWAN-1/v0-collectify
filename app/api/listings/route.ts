import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      title,
      description,
      images,
      startPrice,
      category,
      condition,
      isAuction,
      endTime,
    } = await request.json();

    if (!title || !startPrice) {
      return NextResponse.json({ error: 'Title and start price are required' }, { status: 400 });
    }

    const listing = await prisma.listing.create({
      data: {
        sellerId: user.id,
        title,
        description,
        images,
        startPrice,
        currentPrice: startPrice,
        category,
        condition,
        isAuction,
        endTime: endTime ? new Date(endTime) : null,
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}
