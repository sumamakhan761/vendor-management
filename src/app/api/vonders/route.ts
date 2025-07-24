import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authOptions } from '../auth/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const userId = session.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
  }

  const vendors = await prisma.vendor.findMany({
    where: { userId: userId },
    orderBy: { createdAt: 'desc' },
  });
  
  return NextResponse.json(vendors);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const userId = session.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
  }
  
  const data = await request.json();
  try {
    const newVendor = await prisma.vendor.create({
      data: {
        name: data.name,
        bankAccountNo: data.bankAccountNo,
        bankName: data.bankName,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        country: data.country,
        zipCode: data.zipCode,
        userId: userId,
      },
    });
    return NextResponse.json(newVendor, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create vendor' }, { status: 500 });
  }
}
