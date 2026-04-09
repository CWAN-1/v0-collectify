import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { snap } from '@/lib/midtrans';

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderId } = await request.json();
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { listing: true },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.buyerId !== user.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: order.id,
        gross_amount: parseFloat(order.totalAmount.toString()),
      },
      customer_details: {
        first_name: user.name || 'User',
        email: user.email,
      },
      item_details: [
        {
          id: order.listingId,
          name: order.listing.title,
          price: parseFloat(order.totalAmount.toString()),
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({
      token: transaction.token,
      redirectUrl: transaction.redirect_url,
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
