'use client';

import { useState, useEffect } from 'react';
import { Vendor } from '@/lib/generated/prisma';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VendorFormProps {
  vendor: Vendor | null;
  onSave: (vendor: Omit<Vendor, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function VendorForm({ vendor, onSave, onCancel, isLoading }: VendorFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    bankAccountNo: '',
    bankName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    zipCode: '',
  });

  useEffect(() => {
    if (vendor) {
      setFormData({
        name: vendor.name,
        bankAccountNo: vendor.bankAccountNo,
        bankName: vendor.bankName,
        addressLine1: vendor.addressLine1 ?? '',
        addressLine2: vendor.addressLine2,
        city: vendor.city ?? '',
        country: vendor.country ?? '',
        zipCode: vendor.zipCode ?? '',
      });
    } else {
      setFormData({
        name: '',
        bankAccountNo: '',
        bankName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
        zipCode: '',
      });
    }
  }, [vendor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.bankAccountNo || !formData.bankName || !formData.addressLine2) {
      alert('Please fill all required fields (*)');
      return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Vendor Name <span className="text-red-500">*</span>
          </label>
          <input 
            id="name"
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Enter vendor name" 
            required 
            className="w-full p-3 bg-gray-800/50 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="bankAccountNo" className="text-sm font-medium text-gray-300">
            Bank Account No <span className="text-red-500">*</span>
          </label>
          <input 
            id="bankAccountNo"
            name="bankAccountNo" 
            value={formData.bankAccountNo} 
            onChange={handleChange} 
            placeholder="Enter bank account number" 
            required 
            className="w-full p-3 bg-gray-800/50 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="bankName" className="text-sm font-medium text-gray-300">
            Bank Name <span className="text-red-500">*</span>
          </label>
          <input 
            id="bankName"
            name="bankName" 
            value={formData.bankName} 
            onChange={handleChange} 
            placeholder="Enter bank name" 
            required 
            className="w-full p-3 bg-gray-800/50 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="addressLine1" className="text-sm font-medium text-gray-300">
            Address Line 1
          </label>
          <input 
            id="addressLine1"
            name="addressLine1" 
            value={formData.addressLine1} 
            onChange={handleChange} 
            placeholder="Enter address line 1" 
            className="w-full p-3 bg-gray-800/50 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="addressLine2" className="text-sm font-medium text-gray-300">
            Address Line 2 <span className="text-red-500">*</span>
          </label>
          <input 
            id="addressLine2"
            name="addressLine2" 
            value={formData.addressLine2} 
            onChange={handleChange} 
            placeholder="Enter address line 2" 
            required 
            className="w-full p-3 bg-gray-800/50 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium text-gray-300">
            City
          </label>
          <input 
            id="city"
            name="city" 
            value={formData.city} 
            onChange={handleChange} 
            placeholder="Enter city" 
            className="w-full p-3 bg-gray-800/50 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="country" className="text-sm font-medium text-gray-300">
            Country
          </label>
          <input 
            id="country"
            name="country" 
            value={formData.country} 
            onChange={handleChange} 
            placeholder="Enter country" 
            className="w-full p-3 bg-gray-800/50 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="zipCode" className="text-sm font-medium text-gray-300">
            Zip Code
          </label>
          <input 
            id="zipCode"
            name="zipCode" 
            value={formData.zipCode} 
            onChange={handleChange} 
            placeholder="Enter zip code" 
            className="w-full p-3 bg-gray-800/50 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button 
          type="button" 
          onClick={onCancel} 
          variant="outline"
          disabled={isLoading}
          className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {vendor ? 'Update Vendor' : 'Create Vendor'}
        </Button>
      </div>
    </form>
  );
}
