'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-100 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(59,130,246,0.15),transparent)]"></div>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full"></div>
            <AlertCircle size={120} className="text-blue-500 relative z-10" />
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              404
            </motion.div>
          </div>
        </motion.div>
        
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Page Not Found
        </h1>
        
        <p className="text-gray-400 mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        
        <Button asChild className="flex items-center">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
} 