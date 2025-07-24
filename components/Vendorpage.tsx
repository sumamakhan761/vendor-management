'use client';

import { useState } from 'react';
import { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Vendor } from '@/lib/generated/prisma';
import { motion } from 'framer-motion';
import { Plus, LogOut, User } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

import VendorList from './VendorList';
import VendorForm from './VendorForm';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface VendorPageProps {
  initialVendors: Vendor[];
  session: Session | null;
}

export default function VendorPage({ initialVendors, session }: VendorPageProps) {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();

  const refreshVendors = async () => {
    try {
      const res = await fetch('/api/vonders');
      if (res.ok) {
        const updatedVendors = await res.json();
        setVendors(updatedVendors);
      } else {
        toast.error('Failed to fetch vendors.');
      }
    } catch (error: unknown) {
      console.error('Error fetching vendors:', error);
      toast.error('An error occurred while fetching vendors.');
    }
  };

  const handleSave = async (vendor: Omit<Vendor, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    setIsLoading(true);
    const method = editingVendor ? 'PUT' : 'POST';
    const url = editingVendor ? `/api/vonders/${editingVendor.id}` : '/api/vonders';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vendor),
      });

      if (res.ok) {
        toast.success(`Vendor ${editingVendor ? 'updated' : 'created'} successfully!`);
        setIsDialogOpen(false);
        setEditingVendor(null);
        await refreshVendors();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || `Failed to ${editingVendor ? 'update' : 'create'} vendor.`);
      }
    } catch (error: unknown) {
      console.error('Error saving vendor:', error);
      toast.error(`An error occurred while saving the vendor.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/vonders/${id}`, { method: 'DELETE' });
        if (res.ok) {
          toast.success('Vendor deleted successfully!');
          await refreshVendors();
        } else {
          toast.error('Failed to delete vendor.');
        }
      } catch (error: unknown) {
        console.error('Error deleting vendor:', error);
        toast.error('An error occurred while deleting the vendor.');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const openCreateForm = () => {
    setEditingVendor(null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingVendor(null);
  };

  if (!session) {
    return (
      <div className="text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Button 
            onClick={() => signIn('google')}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <User className="mr-2 h-5 w-5" />
            Login with Google
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-end items-center mb-6 sm:mb-8 gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateForm} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                <Plus className="mr-2 h-5 w-5" />
                Create Vendor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-gray-900 border border-gray-700 shadow-xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-white">{editingVendor ? 'Edit Vendor' : 'Create New Vendor'}</DialogTitle>
                <DialogDescription className="text-gray-400">
                  {editingVendor ? 'Update the vendor information below.' : 'Fill in the details to create a new vendor.'}
                </DialogDescription>
              </DialogHeader>
              <VendorForm
                vendor={editingVendor}
                onSave={handleSave} 
                onCancel={closeDialog}
                isLoading={isLoading}
              />
            </DialogContent>
          </Dialog>
          
          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-10 w-10 border-2 border-gray-700 hover:border-blue-500 transition-colors">
                  <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} className="rounded-full object-cover" />
                  <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                    {session.user?.name?.[0] || session.user?.email?.[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className=" w-60 bg-gray-800 border border-gray-700 p-2 shadow-lg rounded-lg">
                <DropdownMenuLabel className="px-3 py-2 text-sm font-medium text-gray-300">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700 my-1" />
                <DropdownMenuItem 
                  onClick={() => signOut()} 
                  className="px-3 py-2 text-sm cursor-pointer flex items-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" className="rounded-full w-full sm:w-auto">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>

      <VendorList vendors={vendors} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
