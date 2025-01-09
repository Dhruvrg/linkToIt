import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface BestPerformingLinkProps {
  link: {
    url: string;
    totalClicks: number;
  };
}

export default function BestPerformingLink({ link }: BestPerformingLinkProps) {
  return (
    <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold flex items-center">
          <Trophy className="mr-2 h-6 w-6" />
          Best Performing Link
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold text-yellow-100 break-all">
          linktoit.in/{link.url}
        </p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <p className="text-white mt-2">
            <span className="text-4xl font-bold mr-1">
              {link.totalClicks.toLocaleString()}
            </span>
            <span className="opacity-90">clicks</span>
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}
