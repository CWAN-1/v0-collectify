import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const condition = searchParams.get('condition');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (condition) {
      where.condition = condition;
    }

    if (minPrice || maxPrice) {
      where.currentPrice = {};
      if (minPrice) where.currentPrice.gte = parseFloat(minPrice);
      if (maxPrice) where.currentPrice.lte = parseFloat(maxPrice);
    }

    const orderBy: any = {};
    if (sortBy === 'price') {
      orderBy.currentPrice = sortOrder;
    } else {
      orderBy.createdAt = sortOrder;
    }

    const listings = await prisma.listing.findMany({
      where,
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        bids: {
          orderBy: { amount: 'desc' },
          take: 1,
          include: {
            bidder: { select: { id: true, name: true } },
          },
        },
        _count: {
          select: { bids: true, favorites: true },
        },
      },
      orderBy,
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
