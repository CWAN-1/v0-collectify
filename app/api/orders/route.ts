import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { buyerId: user.id },
      include: {
        listing: true,
        buyer: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { listingId, totalAmount, shippingAddress } = await request.json();
    if (!listingId || !totalAmount) {
      return NextResponse.json({ error: 'Listing ID and total amount are required' }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    if (listing.sellerId === user.id) {
      return NextResponse.json({ error: 'Cannot order your own listing' }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        listingId,
        buyerId: user.id,
        totalAmount,
        shippingAddress,
        status: 'pending',
      },
      include: {
        listing: true,
        buyer: { select: { id: true, name: true, avatar: true } },
      },
    });

    await prisma.listing.update({
      where: { id: listingId },
      data: { status: 'sold' },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
