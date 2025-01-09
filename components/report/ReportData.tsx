"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import TotalLinksCard from "@/components/report/TotalLinksCard";
import TopPerformerCard from "@/components/report/TopPerformerCard";
import BestPerformingLink from "@/components/report/BestPerformingLink";
import PerformanceChange from "@/components/report/PerformanceChange";
import GeneratePDFButton from "@/components/report/GeneratePDFButton";

interface ReportDataProps {
  reportData: any;
}

const ReportData: React.FC<ReportDataProps> = ({ reportData }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h1
        className="text-5xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Performance Report
      </motion.h1>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TotalLinksCard totalLinks={reportData.totalLinks} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <BestPerformingLink link={reportData.bestLink} />
        </motion.div>
      </div>

      <motion.div
        className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <TopPerformerCard
          title="Top Platform"
          data={reportData.topPlatform}
          icon="Globe"
        />
        <TopPerformerCard
          title="Top Campaign"
          data={reportData.topCampaign}
          icon="Target"
        />
        <TopPerformerCard
          title="Top Medium"
          data={reportData.topMedium}
          icon="Mail"
        />
        {showMore && (
          <>
            <TopPerformerCard
              title="Top Term"
              data={reportData.topTerm}
              icon="Tag"
            />
            <TopPerformerCard
              title="Top Content"
              data={reportData.topContent}
              icon="FileText"
            />
          </>
        )}
      </motion.div>

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button
          variant="outline"
          onClick={() => setShowMore(!showMore)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {showMore ? "Show Less" : "Show More"}
          <ChevronDown
            className={`ml-2 h-4 w-4 transition-transform duration-200 ${
              showMore ? "rotate-180" : ""
            }`}
          />
        </Button>
      </motion.div>

      {reportData?.performanceChanges && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8"
        >
          <Card className="bg-white shadow-xl rounded-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardTitle className="text-2xl font-bold">
                Performance Changes
              </CardTitle>
            </CardHeader>
            <CardContent className="md:flex md:space-y-0  md:space-x-6 space-x-0  space-y-6 p-6">
              {reportData.performanceChanges.map(
                (change: any, index: number) => (
                  <PerformanceChange key={index} {...change} />
                )
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div
        className="flex justify-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <GeneratePDFButton reportData={reportData} />
      </motion.div>
    </div>
  );
};

export default ReportData;
