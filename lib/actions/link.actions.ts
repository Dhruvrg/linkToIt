"use server";

import { prisma } from "@/prisma";

interface LinkProps {
  destination: string;
  title: string;
  description: string;
  shortUrl: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmSource?: string;
  utmTerm?: string;
  utmContent?: string;
}

interface URLParams {
  url?: string;
}

interface ProjectParams {
  projectId?: string;
}

const removeEmptyStrings = (obj: LinkProps) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([value]) => value !== "")
  );
};

export async function createLink(values: LinkProps, projectId: string) {
  try {
    const cleanedData: any = removeEmptyStrings(values);

    const link = await prisma.link.create({
      data: { projectId, ...cleanedData },
    });
    return link;
  } catch (error: any) {
    throw new Error(`Failed to create link: ${error.message}`);
  }
}

export async function updateLinkCountByUrl(params: URLParams) {
  try {
    const { url } = await params;
    const link = await prisma.link.update({
      where: { shortUrl: url },
      data: { clicks: { increment: 1 } },
    });
    return link;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("Link not found");
    }
    throw new Error(`Failed to update link count: ${error.message}`);
  }
}

export async function getLinks(params: ProjectParams) {
  try {
    const { projectId } = await params;
    const links = await prisma.link.findMany({ where: { projectId } });
    return links;
  } catch (error: any) {
    throw new Error(`Failed to fetch links: ${error.message}`);
  }
}

export async function getAnalytics(params: ProjectParams) {
  try {
    const { projectId } = await params;

    const project = await prisma.project.findFirst({
      where: { id: projectId },
    });
    const links = await prisma.link.findMany({ where: { projectId } });

    const clicksPerDay = project?.clicksPerDay || [];
    const linksclicks = links.reduce((total, link) => total + link.clicks, 0);

    clicksPerDay.push(linksclicks);

    return { clicksPerDay: clicksPerDay, links: links };
  } catch (error: any) {
    throw new Error(`Failed to fetch Analytics: ${error.message}`);
  }
}

export async function updateLink(
  id: string,
  shortUrl: string,
  destinationUrl: string
) {
  try {
    const link = await prisma.link.update({
      where: { id },
      data: { shortUrl: shortUrl, destination: destinationUrl },
    });
    return link;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("Link not found");
    }
    throw new Error(`Failed to update link: ${error.message}`);
  }
}

export async function deleteLink(id: string) {
  try {
    const link = await prisma.link.delete({ where: { id } });
    return link;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("Link not found");
    }
    throw new Error(`Failed to delete link: ${error.message}`);
  }
}

export async function checkShortUrlAvailability(shortUrl: string) {
  try {
    const link = await prisma.link.findUnique({ where: { shortUrl } });

    if (link) {
      return false;
    }
    return true;
  } catch (error: any) {
    throw new Error(`Failed to check short URL availability: ${error.message}`);
  }
}
