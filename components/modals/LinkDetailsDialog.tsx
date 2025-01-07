"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link,
  ExternalLink,
  Calendar,
  BarChart2,
  Hash,
  Target,
  Zap,
  Megaphone,
  Users,
  Tag,
  FileText,
  Copy,
  Info,
} from "lucide-react";

interface LinkDetails {
  id: string;
  destination: string;
  title: string;
  description: string;
  shortUrl: string;
  clicks: number;
  totalClicks: number;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmSource: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  createdAt: Date;
}

interface LinkDetailsDialogProps {
  link: LinkDetails;
}

const LinkDetailsDialog: React.FC<LinkDetailsDialogProps> = ({ link }) => {
  const [isOpen, setIsOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${text} has been copied!`, {
      duration: 3000,
      style: {
        background: "#e6fcf5",
        color: "#0ca678",
        border: "1px solid #63e6be",
      },
      icon: "📋",
    });
  };

  const DetailItem = ({
    icon: Icon,
    label,
    value,
    highlight = false,
  }: {
    icon: any;
    label: string;
    value: string | number;
    highlight?: boolean;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start space-x-3 py-3 px-4 rounded-lg ${
        highlight ? "bg-[#9b7bf7]/10" : ""
      }`}
    >
      <Icon
        className={`w-5 h-5 ${
          highlight ? "text-[#9b7bf7]" : "text-gray-400"
        } mt-1`}
      />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p
          className={`text-sm ${
            highlight ? "text-[#9b7bf7] font-semibold" : "text-gray-900"
          }`}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-[#9b7bf7] hover:text-white transition-colors duration-300"
        >
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="p-6 bg-gradient-to-r from-[#9b7bf7] to-[#7c5ce9]">
          <DialogTitle className="text-2xl font-bold text-white flex items-center">
            <Link className="w-6 h-6 mr-2" />
            Link Details
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 space-y-4"
            >
              <DetailItem
                icon={ExternalLink}
                label="Destination"
                value={link.destination}
                highlight
              />
              <DetailItem icon={FileText} label="Title" value={link.title} />
              <DetailItem
                icon={FileText}
                label="Description"
                value={link.description}
              />
              <div className="flex items-center justify-between py-2 px-4 bg-[#9b7bf7]/10 rounded-lg">
                <DetailItem
                  icon={Hash}
                  label="Short URL"
                  value={`linktoit.in/${link.shortUrl}`}
                  highlight
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(`linktoit.in/${link.shortUrl}`)
                  }
                  className="ml-2 hover:bg-[#9b7bf7] hover:text-white transition-colors duration-300"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <DetailItem
                  icon={Zap}
                  label="Today's Clicks"
                  value={link.clicks}
                  highlight
                />
                <DetailItem
                  icon={BarChart2}
                  label="Total Clicks"
                  value={link.totalClicks}
                  highlight
                />
              </div>
              {(link.utmCampaign ||
                link.utmContent ||
                link.utmMedium ||
                link.utmSource ||
                link.utmTerm) && (
                <>
                  <Separator className="my-4" />
                  <h3 className="text-lg font-semibold text-[#9b7bf7] mb-2">
                    UTM Parameters
                  </h3>
                </>
              )}
              {link.utmMedium && (
                <DetailItem
                  icon={Target}
                  label="UTM Medium"
                  value={link.utmMedium}
                />
              )}
              {link.utmCampaign && (
                <DetailItem
                  icon={Megaphone}
                  label="UTM Campaign"
                  value={link.utmCampaign}
                />
              )}
              {link.utmSource && (
                <DetailItem
                  icon={Users}
                  label="UTM Source"
                  value={link.utmSource}
                />
              )}
              {link.utmTerm && (
                <DetailItem icon={Tag} label="UTM Term" value={link.utmTerm} />
              )}
              {link.utmContent && (
                <DetailItem
                  icon={FileText}
                  label="UTM Content"
                  value={link.utmContent}
                />
              )}
              <Separator className="my-4" />
              <DetailItem
                icon={Calendar}
                label="Created At"
                value={new Date(link.createdAt).toLocaleString()}
              />
            </motion.div>
          </AnimatePresence>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default LinkDetailsDialog;
