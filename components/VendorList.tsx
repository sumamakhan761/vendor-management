'use client';

import { useState } from 'react';
import { Vendor } from '@/lib/generated/prisma';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, Building, Landmark, MapPin, Globe, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface VendorListProps {
  vendors: Vendor[];
  onEdit: (vendor: Vendor) => void;
  onDelete: (id: string) => void;
}

export default function VendorList({ vendors, onEdit, onDelete }: VendorListProps) {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  if (vendors.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-gray-700 backdrop-blur-sm">
        <Building className="mx-auto h-12 w-12 text-gray-600" />
        <p className="mt-4 text-gray-400">No vendors found. Add one to get started!</p>
      </div>
    );
  }

  const handleCardClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
  };

  const handleCloseModal = () => {
    setSelectedVendor(null);
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-6 text-white">Your Vendors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <AnimatePresence>
          {vendors.map((vendor) => (
            <motion.div
              key={vendor.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-4 sm:p-6 cursor-pointer overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
              onClick={() => handleCardClick(vendor)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Building className="mr-2 text-blue-400" /> {vendor.name}
                    </h3>
                    <p className="text-gray-400 flex items-center mt-2">
                      <Landmark className="mr-2 text-gray-500" /> {vendor.bankName}
                    </p>
                    <p className="text-gray-400 flex items-center mt-1 text-sm">
                      <CreditCard className="mr-2 text-gray-500" /> {vendor.bankAccountNo}
                    </p>
                  </div>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50"
                      onClick={(e) => { e.stopPropagation(); onEdit(vendor); }}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-gray-700/50"
                      onClick={(e) => { e.stopPropagation(); onDelete(vendor.id); }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <p className="text-gray-500 text-sm flex items-center">
                    <MapPin size={14} className="mr-1" /> 
                    {vendor.city || 'N/A'}, {vendor.country || 'N/A'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Dialog open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Building className="mr-2 h-5 w-5 text-blue-400" />
              {selectedVendor?.name}
            </DialogTitle>
            <DialogDescription>
              Vendor details and information
            </DialogDescription>
          </DialogHeader>
          
          {selectedVendor && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-800 rounded-lg space-y-4">
                <h4 className="text-sm font-medium text-gray-400">Banking Information</h4>
                <div className="space-y-2">
                  <p className="flex items-center text-white">
                    <Landmark size={18} className="mr-3 text-blue-400" /> 
                    <span className="text-gray-400 w-24">Bank Name:</span> 
                    {selectedVendor.bankName}
                  </p>
                  <p className="flex items-center text-white">
                    <CreditCard size={18} className="mr-3 text-blue-400" /> 
                    <span className="text-gray-400 w-24">Account No:</span> 
                    {selectedVendor.bankAccountNo}
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg space-y-4">
                <h4 className="text-sm font-medium text-gray-400">Address</h4>
                <div className="space-y-2">
                  {selectedVendor.addressLine1 && (
                    <p className="flex items-start text-white">
                      <MapPin size={18} className="mr-3 mt-1 text-blue-400" /> 
                      <span className="text-gray-400 w-24">Line 1:</span> 
                      {selectedVendor.addressLine1}
                    </p>
                  )}
                  <p className="flex items-start text-white">
                    <MapPin size={18} className="mr-3 mt-1 text-blue-400" /> 
                    <span className="text-gray-400 w-24">Line 2:</span> 
                    {selectedVendor.addressLine2}
                  </p>
                  <p className="flex items-center text-white">
                    <Globe size={18} className="mr-3 text-blue-400" /> 
                    <span className="text-gray-400 w-24">Location:</span> 
                    {selectedVendor.city || 'N/A'}, {selectedVendor.country || 'N/A'} {selectedVendor.zipCode ? `- ${selectedVendor.zipCode}` : ''}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => { onEdit(selectedVendor); handleCloseModal(); }}
                  className="flex items-center"
                >
                  <Edit size={16} className="mr-2" /> Edit
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => { onDelete(selectedVendor.id); handleCloseModal(); }}
                  className="flex items-center"
                >
                  <Trash2 size={16} className="mr-2" /> Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
