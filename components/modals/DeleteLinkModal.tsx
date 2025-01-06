import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface DeleteLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export function DeleteLinkModal({
  isOpen,
  onClose,
  onDelete,
}: DeleteLinkModalProps) {
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
            <DialogTitle className="text-2xl font-bold text-[#9b7bf7] flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6 text-yellow-500" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this link? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 p-4 my-4">
            <p className="text-yellow-700 dark:text-yellow-200">
              Deleting this link will permanently remove it from your account
              and make it unavailable to users.
            </p>
          </div>
          <DialogFooter className="md:justify-start md:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 mt-2 md:mt-0 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={onDelete}
              className="bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
            >
              Delete Link
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
