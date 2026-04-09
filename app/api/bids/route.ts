import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { listingId, amount } = await request.json();
    if (!listingId || !amount) {
      return NextResponse.json({ error: 'Listing ID and amount are required' }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { bids: { orderBy: { amount: 'desc' }, take: 1 } },
    });

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    if (listing.sellerId === user.id) {
      return NextResponse.json({ error: 'Cannot bid on your own listing' }, { status: 400 });
    }

    const minAmount = listing.bids.length > 0 ? listing.bids[0].amount : listing.startPrice;
    if (amount <= minAmount) {
      return NextResponse.json({ error: 'Bid must be higher than current bid' }, { status: 400 });
    }

    const bid = await prisma.bid.create({
      data: {
        listingId,
        bidderId: user.id,
        amount,
      },
      include: {
        bidder: { select: { id: true, name: true, avatar: true } },
      },
    });

    await prisma.listing.update({
      where: { id: listingId },
      data: {
        currentPrice: amount,
        priceHistory: {
          create: {
            price: amount,
            eventType: 'bid_placed',
          },
        },
      },
    });

    return NextResponse.json(bid);
  } catch (error) {
    console.error('Error creating bid:', error);
    return NextResponse.json({ error: 'Failed to create bid' }, { status: 500 });
  }
}
