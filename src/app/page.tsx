import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import VendorPage from "@/components/Vendorpage";
import { authOptions } from "./api/auth/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const vendors = session && session.user?.id
    ? await prisma.vendor.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-3 sm:mb-4">
            Vendor Management System
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            A powerful platform to manage your vendors with ease and security
          </p>
        </div>
        
        <VendorPage initialVendors={vendors} session={session} />
      </div>
    </main>
  );
}
