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

export function socialMediaDataProcessor(links: Link[]) {
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
}

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
