"use client";

import React from "react";
import { Link2, PlusCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const EmptyState = () => {
  const pathname = usePathname();
  const projectId = pathname.split("/")[2];

  return (
    <div className="absolute top-0 md:left-64 w-full md:w-[83vw]">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#9b7bf7]/10 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-[#9b7bf7]/20 rounded-full blur-xl"></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative bg-white rounded-full p-8 shadow-xl"
            >
              <Link2 className="w-20 h-20 text-[#9b7bf7]" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-8 h-8 text-[#9b7bf7]" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            No Links Yet
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Your LinkToIt journey begins here! Start by creating your first
            shortened link and watch your project grow.
          </p>
          <Link href={`/dashboard/${projectId}`}>
            <Button className="bg-[#9b7bf7] hover:bg-[#8a6ae6] text-white text-lg py-6 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              <PlusCircle className="mr-2 h-6 w-6" />
              Create Your First Link
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default EmptyState;
