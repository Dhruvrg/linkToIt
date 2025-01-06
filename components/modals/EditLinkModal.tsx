"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Check, X, Loader2 } from "lucide-react";
import { checkShortUrlAvailability } from "@/lib/actions/link.actions";

interface EditLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (shortUrl: string, destinationUrl: string) => void;
  initialShortUrl: string;
  initialDestinationUrl: string;
}

export function EditLinkModal({
  isOpen,
  onClose,
  onSave,
  initialShortUrl,
  initialDestinationUrl,
}: EditLinkModalProps) {
  const [shortUrl, setShortUrl] = useState(initialShortUrl);
  const [destinationUrl, setDestinationUrl] = useState(initialDestinationUrl);
  const [shortUrlAvailability, setShortUrlAvailability] = useState<
    "available" | "taken" | "invalid" | null
  >(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    setShortUrl(initialShortUrl);
    setDestinationUrl(initialDestinationUrl);
    setShortUrlAvailability(null);
  }, [initialShortUrl, initialDestinationUrl]);

  useEffect(() => {
    const checkAvailability = async () => {
      if (shortUrl && shortUrl.length > 2 && shortUrl !== initialShortUrl) {
        setIsChecking(true);
        try {
          const regex = /^[a-z]+$/;
          if (!regex.test(shortUrl)) {
            setShortUrlAvailability("invalid");
            return;
          }
          const isAvailable = await checkShortUrlAvailability(shortUrl);
          setShortUrlAvailability(isAvailable ? "available" : "taken");
        } catch (error) {
          console.error("Error checking short URL availability:", error);
          setShortUrlAvailability(null);
        } finally {
          setIsChecking(false);
        }
      } else {
        setShortUrlAvailability(null);
      }
    };

    const debounceTimer = setTimeout(checkAvailability, 500);

    return () => clearTimeout(debounceTimer);
  }, [shortUrl, initialShortUrl]);

  const handleSave = () => {
    if (shortUrlAvailability !== "taken") {
      onSave(shortUrl, destinationUrl);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#7c5cfa] dark:text-[#9b7bf7] flex items-center">
              <Pencil className="mr-2 h-6 w-6" />
              Edit Link
            </DialogTitle>
            <DialogDescription className="text-gray-700 dark:text-gray-300 text-base">
              Make changes to your link here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="md:space-y-6 space-y-4 py-4">
            <div className="md:space-y-2 space-y-1">
              <Label
                htmlFor="shortUrl"
                className="text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                Short URL
              </Label>
              <div className="relative">
                <Input
                  id="shortUrl"
                  value={shortUrl}
                  onChange={(e) => setShortUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7c5cfa] dark:focus:ring-[#9b7bf7] focus:border-transparent transition-all duration-200 text-gray-800 dark:text-gray-200"
                />
                <AnimatePresence>
                  {isChecking && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                    >
                      <Loader2 className="h-5 w-5 text-[#7c5cfa] dark:text-[#9b7bf7] animate-spin" />
                    </motion.div>
                  )}
                  {!isChecking && shortUrlAvailability && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                    >
                      {shortUrlAvailability === "available" ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : shortUrlAvailability === "taken" ? (
                        <X className="h-5 w-5 text-red-500" />
                      ) : (
                        <X className="h-5 w-5 text-yellow-500" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {shortUrlAvailability && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`text-sm font-medium ${
                      shortUrlAvailability === "available"
                        ? "text-green-600 dark:text-green-400"
                        : shortUrlAvailability === "taken"
                        ? "text-red-600 dark:text-red-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {shortUrlAvailability === "available"
                      ? "Available"
                      : shortUrlAvailability === "taken"
                      ? "Already taken"
                      : "Invalid Short URL"}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="md:space-y-2 space-y-1">
              <Label
                htmlFor="destinationUrl"
                className="text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                Destination URL
              </Label>
              <Input
                id="destinationUrl"
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7c5cfa] dark:focus:ring-[#9b7bf7] focus:border-transparent transition-all duration-200 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="w-full mb-2 md:mb-0 sm:w-auto bg-[#7c5cfa] dark:bg-[#9b7bf7] text-white hover:bg-[#6b4bf0] dark:hover:bg-[#8a6af0] focus:ring-2 focus:ring-offset-2 focus:ring-[#7c5cfa] dark:focus:ring-[#9b7bf7] transition-colors duration-200"
              disabled={isChecking || shortUrlAvailability !== "available"}
            >
              Save changes
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
