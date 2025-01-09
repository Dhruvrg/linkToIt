import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Target, Mail, Tag, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface TopPerformerCardProps {
  title: string;
  data: {
    name: string;
    clicks: number;
  };
  icon: "Globe" | "Target" | "Mail" | "Tag" | "FileText";
}

const iconComponents = {
  Globe,
  Target,
  Mail,
  Tag,
  FileText,
};

const gradients = {
  Globe: "from-green-400 to-blue-500",
  Target: "from-pink-500 to-purple-500",
  Mail: "from-yellow-400 to-orange-500",
  Tag: "from-blue-400 to-indigo-500",
  FileText: "from-red-400 to-pink-500",
};

export default function TopPerformerCard({
  title,
  data,
  icon,
}: TopPerformerCardProps) {
  const IconComponent = iconComponents[icon];

  return (
    <Card
      className={`bg-gradient-to-br ${gradients[icon]} text-white shadow-lg rounded-lg overflow-hidden`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <IconComponent className="mr-2 h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold text-white opacity-90">
          {data.name}
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
              {data.clicks.toLocaleString()}
            </span>
            <span className="opacity-90">clicks</span>
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}
