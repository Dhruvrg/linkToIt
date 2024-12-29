"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import { processData } from "@/lib/chartDataProcessor";

interface Props {
  list: number[];
}

const GraphSection: React.FC<Props> = ({ list }) => {
  const [clickTimeframe, setClickTimeframe] = useState("thisMonth");
  const [totalClicks, setTotalClicks] = useState(0);
  const [chartOptions, setChartOptions] = useState<AgChartOptions>({
    data: [],
    series: [
      {
        type: "bar",
        xKey: "date",
        yKey: "click",
        stroke: "#9b7bf7",
        fill: "#9b7bf7",
        strokeWidth: 1,
      },
    ],
    width: 800,
    height: 400,
  });

  useEffect(() => {
    setChartOptions((chartOptions) => ({
      ...chartOptions,
      data: processData(list, clickTimeframe),
    }));
    setTotalClicks(list.reduce((sum, clicks) => sum + clicks, 0));
  }, [clickTimeframe]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num.toString();
    }
  };

  return (
    <Card className="rounded-lg overflow-hidden bg-white">
      <CardHeader className="bg-gradient-to-r from-[#9b7bf7] to-[#7c5ce9] text-white p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <CardTitle className="text-2xl font-bold flex items-center">
              <Activity className="mr-3 h-6 w-6" />
              Click Performance
            </CardTitle>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full -my-1">
              <span className="text-sm font-medium text-white">
                Total Clicks
              </span>
              <span className="text-xl font-bold text-white ml-2">
                {formatNumber(totalClicks)}
              </span>
            </div>
          </div>
          <Tabs
            value={clickTimeframe}
            onValueChange={setClickTimeframe}
            className="space-y-4"
          >
            <TabsList className="bg-white bg-opacity-20 p-1 rounded-md">
              <TabsTrigger
                value="thisWeek"
                className="data-[state=active]:bg-white data-[state=active]:text-[#9b7bf7] text-white px-3 py-1 rounded"
              >
                <Clock className="mr-1 h-4 w-4" />
                This Week
              </TabsTrigger>
              <TabsTrigger
                value="thisMonth"
                className="data-[state=active]:bg-white data-[state=active]:text-[#9b7bf7] text-white px-3 py-1 rounded"
              >
                <Clock className="mr-1 h-4 w-4" />
                This Month
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                className="data-[state=active]:bg-white data-[state=active]:text-[#9b7bf7] text-white px-3 py-1 rounded"
              >
                <Clock className="mr-1 h-4 w-4" />
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="daily"
                className="data-[state=active]:bg-white data-[state=active]:text-[#9b7bf7] text-white px-3 py-1 rounded"
              >
                <Clock className="mr-1 h-4 w-4" />
                Daily
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-[#f8f7ff] h-full">
        <div className="bg-white p-4 rounded-lg shadow-inner">
          <AgCharts options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default GraphSection;
