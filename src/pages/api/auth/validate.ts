import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { IUser } from '@/lib/models/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as {
      userId: string;
      email: string;
    };

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const users = db.collection<IUser>('users');

    const user = await users.findOne(
      { _id: decoded.userId },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
} 