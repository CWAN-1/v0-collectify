import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function getAuthenticatedUser(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) {
    return null;
  }

  const tokenCookie = cookieHeader
    .split(';')
    .find(c => c.trim().startsWith('token='));

  if (!tokenCookie) {
    return null;
  }

  const token = tokenCookie.split('=')[1];
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true, avatar: true },
    });
    return user;
  } catch (error) {
    return null;
  }
}
