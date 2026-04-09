import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { core } from '@/lib/midtrans';
import crypto from 'crypto';

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { order_id, transaction_status, fraud_status, signature_key } = body;

    const hash = crypto
      .createHash('sha512')
      .update(order_id + body.status_code + body.gross_amount + MIDTRANS_SERVER_KEY)
      .digest('hex');

    if (hash !== signature_key) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    let newStatus = 'pending';
    if (transaction_status === 'capture' || transaction_status === 'settlement') {
      if (fraud_status === 'accept') {
        newStatus = 'paid';
      }
    } else if (transaction_status === 'cancel' || transaction_status === 'deny' || transaction_status === 'expire') {
      newStatus = 'cancelled';
    } else if (transaction_status === 'pending') {
      newStatus = 'pending';
    }

    await prisma.order.update({
      where: { id: order_id },
      data: { 
        status: newStatus,
        paymentId: body.transaction_id,
      },
    });

    if (newStatus === 'paid') {
      const order = await prisma.order.findUnique({
        where: { id: order_id },
      });
      if (order) {
        await prisma.listing.update({
          where: { id: order.listingId },
          data: { status: 'sold' },
        });
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: 'Failed to handle webhook' }, { status: 500 });
  }
}
