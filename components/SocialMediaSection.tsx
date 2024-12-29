"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Platform } from "@/types";
import { SocialIcon } from "react-social-icons";

interface Media {
  platform: Platform;
  clicks: number;
  color: string;
}

interface Props {
  data: Media[];
}

export default function SocialMediaSection({ data = [] }: Props) {
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num.toString();
    }
  };

  const visiblePlatforms = expanded ? data : data.slice(0, 5);

  useEffect(() => {
    if (listRef.current) {
      if (expanded) {
        listRef.current.style.maxHeight = `${listRef.current.scrollHeight}px`;
      } else {
        listRef.current.style.maxHeight = "none";
      }
    }
  }, [expanded, data]);
  return (
    <Card className="shadow-lg rounded-lg overflow-hidden border border-[#e0d8ff] bg-white">
      <CardHeader className="bg-gradient-to-r from-[#9b7bf7] to-[#7c5ce9] text-white p-6">
        <CardTitle className="text-2xl font-bold flex items-center">
          <Activity className="mr-3 h-6 w-6" />
          Platform Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ul
          ref={listRef}
          className={`space-y-2 transition-all duration-300 ease-in-out ${
            expanded ? "overflow-y-auto custom-scrollbar" : "overflow-hidden"
          }`}
          style={{ maxHeight: expanded ? "400px" : "none" }}
        >
          <AnimatePresence initial={false}>
            {visiblePlatforms.map((platform) => {
              return (
                <motion.li
                  key={platform.platform}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#f8f7ff] to-white hover:shadow-lg group"
                >
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="p-2 rounded-full mr-4 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `${platform.color}20` }}
                        >
                          {platform.platform !== "Other" ? (
                            <SocialIcon
                              network={platform.platform.toLocaleLowerCase()}
                              style={{ width: 30, height: 30 }}
                            />
                          ) : (
                            <div className="h-8 w-8 bg-gray-300 rounded-full" />
                          )}
                        </div>
                        <span className="font-semibold text-lg text-gray-800">
                          {platform.platform}
                        </span>
                      </div>
                      <div className="text-right text-[#9b7bf7] font-bold text-xl">
                        {formatNumber(platform.clicks)}
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#9b7bf7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
        {data.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <Button
              onClick={() => setExpanded(!expanded)}
              variant="outline"
              className="text-[#9b7bf7] border-[#9b7bf7] hover:bg-[#9b7bf7] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg rounded-full px-6 py-2 font-semibold"
            >
              {expanded ? (
                <>
                  <ChevronUpIcon className="mr-2 h-5 w-5" />
                  View Less
                </>
              ) : (
                <>
                  <ChevronDownIcon className="mr-2 h-5 w-5" />
                  View More
                </>
              )}
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
