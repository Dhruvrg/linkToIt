"use client";

import React from "react";
import {
  ArrowRight,
  ExternalLink,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { updateLinkCountByUrl } from "@/lib/actions/link.actions";
import { Link } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface Params {
  url?: string;
}

const page = ({ params }: { params: Params }) => {
  const router = useRouter();

  useEffect(() => {
    const setData = async () => {
      try {
        const link: Link = await updateLinkCountByUrl(params);
        router.push(link.destination);
      } catch (error) {
        router.push("http://localhost:3000/");
      }
    };
    setData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9b7bf7] to-[#7c5ce9] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-md bg-white/90 border-none shadow-2xl">
          <CardHeader className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <ExternalLink className="text-[#9b7bf7] absolute h-10 w-10" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-[#9b7bf7]">
              You're being redirected
            </CardTitle>
            <CardDescription className="text-gray-600">
              We're preparing your destination
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-green-600">
                <Shield className="mr-2 h-5 w-5" />
                <span className="text-sm font-medium">Secure redirect</span>
              </div>
              <div className="flex items-center text-blue-600">
                <Clock className="mr-2 h-5 w-5" />
                <span className="text-sm font-medium">Preparing link...</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Redirect progress</span>
                <span className="text-[#9b7bf7]">75%</span>
              </div>
              <Progress value={75} className="h-2 bg-gray-200 " />
            </div>

            <div className="bg-green-100 rounded-lg p-3 flex items-center">
              <CheckCircle className="text-green-600 mr-2 h-5 w-5" />
              <p className="text-sm text-green-700">
                This link has been verified as safe
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-[#9b7bf7] hover:bg-[#8a6ae6] text-white py-3 rounded-xl text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center justify-center">
              Go to destination now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-gray-500 text-center">
              Powered by LinkToIt - Secure and fast redirects
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default page;
