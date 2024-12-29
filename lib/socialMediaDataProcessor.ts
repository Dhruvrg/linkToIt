import { socialMediaPlatforms } from "@/constants";
import { Link } from "@prisma/client";

export function processData(links: Link[]) {
  const platformData: any = [];
  let otherClicks = 0;

  links.forEach((item) => {
    const utmSource = item.utmSource || "other";
    const { clicks } = item;

    const mediaItem = socialMediaPlatforms.find(
      (config) => config.match === utmSource.toLowerCase()
    );

    if (mediaItem) {
      const existingPlatform = platformData.find(
        (p: any) => p.match === mediaItem.match
      );
      if (existingPlatform) {
        existingPlatform.clicks += clicks;
      } else {
        platformData.push({
          match: mediaItem.match,
          platform: mediaItem.platform,
          clicks: clicks,
          color: mediaItem.color,
        });
      }
    } else {
      otherClicks += clicks;
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
