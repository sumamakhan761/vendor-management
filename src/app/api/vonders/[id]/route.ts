import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authOptions } from '../../auth/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const userId = session.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
  }
  
  const id = params.id;

  const existingVendor = await prisma.vendor.findUnique({
    where: { id },
  });
  
  if (!existingVendor) {
    return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
  }
  
  if (existingVendor.userId !== userId) {
    return NextResponse.json({ error: 'Not authorized to update this vendor' }, { status: 403 });
  }
  
  const data = await request.json();
  const updatedVendor = await prisma.vendor.update({
    where: { id },
    data: data,
  });
  return NextResponse.json(updatedVendor);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const userId = session.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
  }
  
  const id = params.id;
  
  const existingVendor = await prisma.vendor.findUnique({
    where: { id },
  });
  
  if (!existingVendor) {
    return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
  }
  
  if (existingVendor.userId !== userId) {
    return NextResponse.json({ error: 'Not authorized to delete this vendor' }, { status: 403 });
  }
  
  await prisma.vendor.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'Vendor deleted successfully' }, { status: 200 });
}
