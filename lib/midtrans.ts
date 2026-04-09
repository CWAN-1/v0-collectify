import midtransClient from 'midtrans-client';

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || '';
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY || '';
const MIDTRANS_ENV = process.env.MIDTRANS_ENV || 'sandbox';

export const snap = new midtransClient.Snap({
  isProduction: MIDTRANS_ENV === 'production',
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY,
});

export const core = new midtransClient.CoreApi({
  isProduction: MIDTRANS_ENV === 'production',
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY,
});
