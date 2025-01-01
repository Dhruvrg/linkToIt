import { Project } from "@prisma/client";
import { create } from "zustand";

interface ProjectState {
  projects: Project[];
  addProject: (project: Project) => void;
  setProjects: (projects: Project[]) => void;
  removeProject: (projectId: string) => void;
  updateProjectDetails: (
    projectId: string,
    newTitle: string,
    newDescription: string
  ) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  setProjects: (projects) => set({ projects }),

  removeProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== projectId),
    })),

  updateProjectDetails: (projectId, newTitle, newDescription) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? { ...project, name: newTitle, description: newDescription }
          : project
      ),
    })),
}));
