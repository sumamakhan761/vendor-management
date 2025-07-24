import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authOptions } from '../../auth/auth';


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const id = params.id;
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
  const id = params.id;
  await prisma.vendor.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'Vendor deleted successfully' }, { status: 200 });
}
