import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LinkIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface TotalLinksCardProps {
  totalLinks: number
}

export default function TotalLinksCard({ totalLinks }: TotalLinksCardProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold flex items-center">
          <LinkIcon className="mr-2 h-6 w-6" />
          Total Links
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <p className="text-5xl font-bold">{totalLinks.toLocaleString()}</p>
        </motion.div>
        <p className="text-blue-100 mt-2">Active short links</p>
      </CardContent>
    </Card>
  )
}