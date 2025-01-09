import { socialMediaPlatforms } from "@/constants";
import { Link } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `#${((hash >> 16) & 0xff).toString(16).padStart(2, "0")}${(
    (hash >> 8) &
    0xff
  )
    .toString(16)
    .padStart(2, "0")}${(hash & 0xff).toString(16).padStart(2, "0")}`;
};

export const socialMediaDataProcessor = (links: Link[]) => {
  const platformData: any = [];
  let otherClicks = 0;

  links.forEach((item) => {
    const utmSource = item.utmSource || "other";
    const { totalClicks } = item;

    const mediaItem = socialMediaPlatforms.find(
      (config) => config.match === utmSource.toLowerCase()
    );

    if (mediaItem) {
      const existingPlatform = platformData.find(
        (p: any) => p.match === mediaItem.match
      );
      if (existingPlatform) {
        existingPlatform.totalClicks += totalClicks;
      } else {
        platformData.push({
          match: mediaItem.match,
          platform: mediaItem.platform,
          clicks: totalClicks,
          color: mediaItem.color,
        });
      }
    } else {
      otherClicks += totalClicks;
    }
  });

  if (otherClicks > 0) {
    platformData.push({
      match: "other",
      platform: "Other",
      clicks: otherClicks,
      color: "#AAAAAA",
    });
  }

  return platformData.sort((a: any, b: any) => b.clicks - a.clicks);
};

export function utmDataProcessor(
  links: Link[],
  utmTag: "utmCampaign" | "utmMedium" | "utmTerm" | "utmContent"
) {
  const data: { name: string; clicks: number }[] = [];
  let otherClicks = 0;

  links.forEach((item) => {
    const name = item[utmTag]?.trim() || "Other";
    const { totalClicks } = item;

    if (name !== "Other") {
      const existingPlatform = data.find((p: any) => p.name === name);
      if (existingPlatform) {
        existingPlatform.clicks += totalClicks;
      } else {
        data.push({
          name: name,
          clicks: totalClicks,
        });
      }
    } else {
      otherClicks += totalClicks;
    }
  });

  if (otherClicks > 0) {
    data.push({
      name: "Other",
      clicks: otherClicks,
    });
  }

  return data.sort((a: any, b: any) => b.clicks - a.clicks);
}

export const generateReportData = (links: Link[], clicksPerDay: number[]) => {
  const totalLinks = links.length;

  const bestLink = links.reduce(
    (best, current) =>
      current.totalClicks > best.totalClicks ? current : best,
    { totalClicks: 0, shortUrl: "" } as (typeof links)[number]
  );

  const getTopMetric = (
    key: "utmCampaign" | "utmMedium" | "utmTerm" | "utmContent" | "utmSource"
  ) => {
    const metrics = links.reduce<Record<string, number>>((acc, link) => {
      const value = link[key];
      if (value && value !== "Unknown") {
        acc[value] = (acc[value] || 0) + link.totalClicks;
      }
      return acc;
    }, {});

    const [name, totalClicks] = Object.entries(metrics).reduce(
      (top, current) => (current[1] > top[1] ? current : top),
      ["", 0]
    );

    const formattedName =
      name.length > 0 ? name[0].toUpperCase() + name.slice(1) : "None";

    return { name: formattedName || "None", clicks: totalClicks };
  };

  const calculatePercentageChange = (previous: number, current: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const periods = ["Yesterday", "Last Week", "Last Month"] as const;

  const performanceChanges = () => {
    const periodMapping = {
      Yesterday: 1,
      "Last Week": 7,
      "Last Month": 30,
    } as const;

    const length = clicksPerDay.length;
    if (length <= 1) return null;

    return periods.map((period) => {
      const daysBack = periodMapping[period];

      if (daysBack >= length) return;

      const currentClicks = clicksPerDay[length - 1];
      const previousClicks = clicksPerDay[length - 1 - daysBack];

      const change = calculatePercentageChange(previousClicks, currentClicks);

      return { period, change: Number(change.toFixed(1)) };
    });
  };

  const reportData = {
    totalLinks,
    bestLink: {
      url: bestLink.shortUrl,
      totalClicks: bestLink.totalClicks,
    },
    topPlatform: getTopMetric("utmSource"),
    topCampaign: getTopMetric("utmCampaign"),
    topMedium: getTopMetric("utmMedium"),
    topTerm: getTopMetric("utmTerm"),
    topContent: getTopMetric("utmContent"),
    performanceChanges: performanceChanges(),
  };

  return reportData;
};
