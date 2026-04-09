import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { followingId } = await request.json();
    if (!followingId) {
      return NextResponse.json({ error: 'Following ID is required' }, { status: 400 });
    }

    if (followingId === user.id) {
      return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 });
    }

    const existingFollow = await prisma.follow.findFirst({
      where: { followerId: user.id, followingId },
    });

    if (existingFollow) {
      return NextResponse.json({ error: 'Already following' }, { status: 409 });
    }

    const follow = await prisma.follow.create({
      data: { followerId: user.id, followingId },
      include: {
        following: { select: { id: true, name: true, avatar: true } },
      },
    });

    return NextResponse.json(follow);
  } catch (error) {
    console.error('Error following user:', error);
    return NextResponse.json({ error: 'Failed to follow user' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { followingId } = await request.json();
    if (!followingId) {
      return NextResponse.json({ error: 'Following ID is required' }, { status: 400 });
    }

    const follow = await prisma.follow.findFirst({
      where: { followerId: user.id, followingId },
    });

    if (!follow) {
      return NextResponse.json({ error: 'Follow not found' }, { status: 404 });
    }

    await prisma.follow.delete({
      where: { id: follow.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return NextResponse.json({ error: 'Failed to unfollow user' }, { status: 500 });
  }
}
