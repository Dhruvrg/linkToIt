"use client";

import { SafeUser } from "@/types";
import Avatar from "../Avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { BarChart2, Menu } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const HomeNavbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#9b7bf7] text-white sticky top-0 z-50 md:px-10">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-[1px] rounded-full">
            <Image
              className="rounded-full"
              height="35"
              width="35"
              alt="Logo"
              src={"/logo.png"}
            />
          </div>
          <span className="text-2xl font-bold">LinkToIt</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link
                  href="/"
                  className="text-lg font-semibold transition-all duration-500 hover:font-bold hover:text-xl"
                >
                  Home
                </Link>
              </li>
              <li>
                {currentUser ? (
                  <Link
                    href="/pricing"
                    className="text-lg font-semibold transition-all duration-500 hover:font-bold hover:text-xl"
                  >
                    Pricing
                  </Link>
                ) : (
                  <div
                    onClick={() =>
                      toast.error("You need to sign in first!", {
                        duration: 4000,
                        style: {
                          background: "#fef2f2",
                          color: "#991b1b",
                          border: "1px solid #f87171",
                        },
                        icon: "🔒",
                      })
                    }
                    className="text-lg font-semibold transition-all duration-500 hover:font-bold hover:text-xl"
                  >
                    Pricing
                  </div>
                )}
              </li>
              {currentUser && (
                <li>
                  <Link
                    href={currentUser.plan ? "/dashboard" : "/pricing"}
                    className="bg-white text-[#9b7bf7] px-4 py-2 rounded-md font-semibold hover:bg-[#9b7bf7] hover:text-white transition-colors shadow-md border border-[#9b7bf7] flex items-center space-x-2"
                  >
                    <BarChart2 className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          {currentUser ? (
            <Avatar src={currentUser?.image} />
          ) : (
            <Button
              onClick={() => signIn("google")}
              variant="outline"
              className="bg-white text-[#9b7bf7] px-4 py-5 rounded-md font-bold hover:bg-[#9b7bf7] hover:text-white transition-colors shadow-md border border-[#9b7bf7]"
            >
              Sign in with Google
            </Button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden py-4">
          <nav className="flex flex-col items-center">
            <ul className="space-y-4 text-center">
              <li>
                <Link
                  href="/"
                  className="block hover:text-gray-200 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="block hover:text-gray-200 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              {currentUser && (
                <li>
                  <Link
                    href={currentUser.plan ? "/dashboard" : "/pricing"}
                    className="bg-white text-[#9b7bf7] px-4 py-2 rounded-md font-semibold hover:bg-[#9b7bf7] hover:text-white transition-colors shadow-md border border-[#9b7bf7] flex items-center space-x-2"
                  >
                    <BarChart2 className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <div className="mt-4 text-center">
            {!currentUser && (
              <Button
                onClick={() => signIn("google")}
                variant="outline"
                className="bg-white text-[#9b7bf7] px-4 py-5 rounded-md font-semibold hover:bg-[#9b7bf7] hover:text-white transition-colors shadow-md border border-[#9b7bf7]"
              >
                Sign in with Google
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default HomeNavbar;
