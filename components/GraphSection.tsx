"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback, useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import { processData } from "@/lib/chartDataProcessor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timeframes } from "@/constants";

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
    padding: {
      top: 20,
      right: 10,
      bottom: 20,
      left: 10,
    },
    legend: {
      enabled: false,
    },
    axes: [
      {
        type: "category",
        position: "bottom",
        label: {
          rotation: 0,
          autoRotate: true,
        },
      },
      {
        type: "number",
        position: "left",
        label: {
          formatter: (params) => formatNumber(params.value),
        },
      },
    ],
    width: 800,
    height: 400,
  });

  const updateChartSize = () => {
    const isMobile = window.innerWidth <= 768;
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      width: isMobile ? window.innerWidth - 40 : 800,
      height: isMobile ? 300 : 400,
    }));
  };

  useEffect(() => {
    updateChartSize();
    window.addEventListener("resize", updateChartSize);

    return () => window.removeEventListener("resize", updateChartSize);
  }, []);

  const updateChartData = useCallback(() => {
    const processedData = processData(list, clickTimeframe);
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      data: processedData,
    }));
    setTotalClicks(list.reduce((sum, clicks) => sum + clicks, 0));
  }, [list, clickTimeframe]);

  useEffect(() => {
    updateChartData();
  }, [updateChartData]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num.toString();
    }
  };

  const handleTimeframeChange = (value: string) => {
    setClickTimeframe(value);
  };

  return (
    <Card className="rounded-lg overflow-hidden bg-white">
      <CardHeader className="bg-gradient-to-r from-[#9b7bf7] to-[#7c5ce9] text-white p-4 sm:p-6 space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <CardTitle className="text-xl sm:text-2xl font-bold flex items-center whitespace-nowrap">
              <Activity className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Click Performance
            </CardTitle>
            <div className="bg-white bg-opacity-20 px-3 py-1 sm:px-4 sm:py-2 rounded-full whitespace-nowrap">
              <span className="text-xs sm:text-sm font-medium text-white">
                Total Clicks
              </span>
              <span className="text-lg sm:text-xl font-bold text-white ml-2">
                {formatNumber(totalClicks)}
              </span>
            </div>
          </div>
          <div className="w-full sm:w-auto mt-4 sm:mt-0">
            <div className="block sm:hidden">
              <Select
                value={clickTimeframe}
                onValueChange={handleTimeframeChange}
              >
                <SelectTrigger className="w-full bg-white bg-opacity-20 text-white border-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 ease-in-out hover:bg-opacity-30">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent className="bg-[#9b7bf7] text-white border-none rounded-md shadow-lg">
                  {timeframes.map((tf) => (
                    <SelectItem
                      key={tf.value}
                      value={tf.value}
                      className="focus:bg-white focus:bg-opacity-20 hover:bg-white hover:bg-opacity-10 transition-all duration-200 ease-in-out"
                    >
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {tf.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="hidden sm:block">
              <Tabs
                value={clickTimeframe}
                onValueChange={handleTimeframeChange}
              >
                <TabsList className="bg-white bg-opacity-20 p-1 rounded-md flex">
                  {timeframes.map((tf) => (
                    <TabsTrigger
                      key={tf.value}
                      value={tf.value}
                      className="data-[state=active]:bg-white data-[state=active]:text-[#9b7bf7] text-white px-3 py-1 rounded text-sm transition-all duration-200 ease-in-out hover:bg-white hover:bg-opacity-30 hover:text-[#9b7bf7]"
                    >
                      <Clock className="mr-1 h-4 w-4" />
                      {tf.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 bg-[#f8f7ff] h-full">
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow-inner">
          <div className="w-full h-[300px] sm:h-[400px]">
            <AgCharts options={chartOptions} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraphSection;
