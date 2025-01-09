import { ArrowDown, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

interface PerformanceChangeProps {
  period: string;
  change: number;
}

export default function PerformanceChange({
  period,
  change,
}: PerformanceChangeProps) {
  const isPositive = change >= 0;
  return (
    <motion.div
      className="flex w-full items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span className="font-medium text-gray-700">{period}</span>
      <div
        className={`flex items-center ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {isPositive ? (
          <ArrowUp className="w-5 h-5 mr-1" />
        ) : (
          <ArrowDown className="w-5 h-5 mr-1" />
        )}
        <motion.span
          className="font-bold text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {Math.abs(change)}%
        </motion.span>
      </div>
    </motion.div>
  );
}
