import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { listingId } = await request.json();
    if (!listingId) {
      return NextResponse.json({ error: 'Listing ID is required' }, { status: 400 });
    }

    const existingFavorite = await prisma.favorite.findFirst({
      where: { userId: user.id, listingId },
    });

    if (existingFavorite) {
      return NextResponse.json({ error: 'Already favorited' }, { status: 409 });
    }

    const favorite = await prisma.favorite.create({
      data: { userId: user.id, listingId },
      include: { listing: true },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    console.error('Error creating favorite:', error);
    return NextResponse.json({ error: 'Failed to create favorite' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { listingId } = await request.json();
    if (!listingId) {
      return NextResponse.json({ error: 'Listing ID is required' }, { status: 400 });
    }

    const favorite = await prisma.favorite.findFirst({
      where: { userId: user.id, listingId },
    });

    if (!favorite) {
      return NextResponse.json({ error: 'Favorite not found' }, { status: 404 });
    }

    await prisma.favorite.delete({
      where: { id: favorite.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    return NextResponse.json({ error: 'Failed to delete favorite' }, { status: 500 });
  }
}
