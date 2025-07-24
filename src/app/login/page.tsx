'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_70%_20%,#3b82f6,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_300px_at_30%_80%,#6366f1,transparent)]" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-gray-900/60 backdrop-blur-sm rounded-lg shadow-xl border border-gray-800"
      >
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Welcome Back
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 text-lg text-gray-400"
          >
            Sign in to continue to your dashboard.
          </motion.p>
        </div>

        {error && <p className="text-center text-red-500">{error}</p>}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4"
        >
          <Button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-gray-200"
          >
            <FaGoogle />
            Sign in with Google
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-gray-900/60 text-gray-500">
              Secure Authentication
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 