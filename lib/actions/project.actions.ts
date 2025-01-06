"use server";

import { prisma } from "@/prisma";
import getCurrentUser from "./getCurrentUser";

interface IParams {
  projectId?: string;
}

export async function getProjects() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }
    const projects = await prisma.project.findMany({
      where: { userId: currentUser?.id },
    });
    return projects;
  } catch (error: any) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
}

export async function getProject() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return;
    }
    const project = await prisma.project.findFirst({
      where: { userId: currentUser?.id },
    });
    return project;
  } catch (error: any) {
    throw new Error(`Failed to fetch project: ${error.message}`);
  }
}

export async function createProject(name: string, description: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }
    const project = await prisma.project.create({
      data: {
        name,
        description,
        userId: currentUser?.id,
      },
    });
    return project;
  } catch (error: any) {
    throw new Error(`Failed to create project: ${error.message}`);
  }
}

export async function getProjectById(params: IParams) {
  try {
    const { projectId } = await params;
    if (projectId === undefined) return null;
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    return project;
  } catch (error: any) {
    throw new Error(`Failed to fetch Project: ${error.message}`);
  }
}

export async function getSettingsPageData(params: IParams) {
  try {
    const { projectId } = await params;

    if (!projectId) return null;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) return null;

    const links = await prisma.link.findMany({ where: { projectId } });

    const totalLinks = links.length;

    const totalClicks = links.reduce(
      (total, link) => total + link.totalClicks,
      0
    );

    return {
      projectId: project.id,
      name: project.name,
      description: project.description,
      createdAt: project.createdAt.toISOString().split("T")[0],
      totalLinks,
      totalClicks,
    };
  } catch (error: any) {
    throw new Error(`Failed to fetch settings page data: ${error.message}`);
  }
}

export async function updateProject(
  projectId: string,
  name: string,
  description: string
) {
  try {
    if (projectId === undefined) return null;

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        ...(name && { name }),
        ...(description && { description }),
      },
    });

    return updatedProject;
  } catch (error: any) {
    throw new Error(`Failed to update Project: ${error.message}`);
  }
}

export async function deleteProject(projectId: string) {
  try {
    const project = await prisma.project.delete({ where: { id: projectId } });
    return project;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("Project not found");
    }
    throw new Error(`Failed to delete project: ${error.message}`);
  }
}
