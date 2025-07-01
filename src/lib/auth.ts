import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { prisma } from './prisma';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'fallback-secret';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface JWTPayload {
  userId: string;
  email: string;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export  function verifyToken(token: string){
  try {
    console.log(token)
    const val =  jwt.verify(token, JWT_SECRET) as JWTPayload;
    console.log(val)
    return val
  } catch {
    return null;
  }
}

export async function createUser(email: string, password: string, name: string): Promise<User> {
  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  
  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      name,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    }
  });
  
  return user;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  
  if (!user) return null;
  
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid)  return null;
  
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    }
  });
  
  return user;
}

export async function getUserFromRequest(request: NextRequest): Promise<User | null> {
  const token = request.cookies.get('auth-token')?.value;
  if (!token) return null;
  
  const payload =  verifyToken(token);
  if (!payload) return null;
  
  return await getUserById(payload.userId);
}