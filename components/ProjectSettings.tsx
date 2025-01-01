"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Settings,
  Trash2,
  Save,
  AlertTriangle,
  BarChart2,
  Link,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";
import { deleteProject, updateProject } from "@/lib/actions/project.actions";
import { useProjectStore } from "@/lib/store";

interface Props {
  mockProject: {
    projectId: string;
    name: string;
    description: string;
    createdAt: string;
    totalLinks: number;
    totalClicks: number;
  };
}

const ProjectSettings: React.FC<Props> = ({ mockProject }) => {
  const router = useRouter();
  const [project, setProject] = useState(mockProject);
  const [isLoading, setIsLoading] = useState(false);
  const removeProject = useProjectStore((state) => state.removeProject);
  const projects = useProjectStore((state) => state.projects);
  const updateProjectDetails = useProjectStore(
    (state) => state.updateProjectDetails
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { projectId, name, description } = project;
      await updateProject(projectId, name, description);
      updateProjectDetails(projectId, name, description);
      toast.success("Your project settings have been updated successfully.");
    } catch (error) {
      toast.error("Something went wrong!");
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const { projectId } = project;
      await deleteProject(projectId);
      removeProject(projectId);
      toast.dismiss("Your project has been deleted successfully");
    } catch (error) {
      toast.error("Something went wrong!");
    }

    setIsLoading(false);
    if (projects.length === 1) {
      router.push("/dashboard");
    } else {
      router.push(`/dashboard/${projects.slice(-1)[0].id}`);
    }
  };

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-lg border-none h-full flex flex-col">
              <CardHeader className="bg-[#9b7bf7] text-white">
                <CardTitle className="text-2xl flex items-center">
                  <Settings className="mr-2 h-6 w-6" />
                  General Settings
                </CardTitle>
                <CardDescription className="text-white text-opacity-80">
                  Manage your project's basic information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6 flex-grow">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label
                    htmlFor="name"
                    className="text-[#9b7bf7] font-semibold"
                  >
                    Project Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={project?.name}
                    onChange={handleInputChange}
                    placeholder="Enter project name"
                    className="border-[#9b7bf7] border-opacity-20 focus:border-[#9b7bf7] focus:ring-[#9b7bf7] transition-all duration-300"
                  />
                </motion.div>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label
                    htmlFor="description"
                    className="text-[#9b7bf7] font-semibold"
                  >
                    Project Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={project?.description}
                    onChange={handleInputChange}
                    placeholder="Describe your project"
                    rows={4}
                    className="border-[#9b7bf7] border-opacity-20 focus:border-[#9b7bf7] focus:ring-[#9b7bf7] transition-all duration-300"
                  />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Project Summary and Save Changes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 flex flex-col"
          >
            <Card className="shadow-lg border-none flex-grow flex flex-col">
              <CardHeader className="bg-[#9b7bf7] text-white">
                <CardTitle className="text-2xl flex items-center">
                  Project Summary
                </CardTitle>
                <CardDescription className="text-white text-opacity-80">
                  Overview of your project statistics.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6 flex-grow flex flex-col justify-between">
                <div className="space-y-6">
                  {[
                    {
                      icon: Link,
                      label: "Total Links",
                      value: project?.totalLinks,
                    },
                    {
                      icon: BarChart2,
                      label: "Total Clicks",
                      value: project?.totalClicks,
                    },
                    {
                      icon: Calendar,
                      label: "Created On",
                      value: project?.createdAt,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <span className="flex items-center text-gray-600">
                        <item.icon className="mr-2 h-5 w-5 text-[#9b7bf7]" />
                        {item.label}
                      </span>
                      <span className="font-bold text-lg text-[#9b7bf7]">
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6"
                >
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="w-full bg-[#9b7bf7] hover:bg-[#8a6af0] text-white transition-all duration-300 text-lg px-8 py-3 rounded-md shadow-md"
                  >
                    {isLoading ? (
                      <>
                        <Settings className="mr-2 h-5 w-5 animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-5 w-5" />
                        Save All Changes
                      </>
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <Card className="shadow-lg border-none">
            <CardHeader className="bg-red-500 text-white">
              <CardTitle className="text-2xl flex items-center">
                <AlertTriangle className="mr-2 h-6 w-6" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-white text-opacity-80">
                Irreversible actions for your project.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700">
                    Delete Project
                  </h3>
                  <p className="text-sm text-gray-600">
                    Once you delete a project, there is no going back. Please be
                    certain.
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="bg-red-500 hover:bg-red-600 transition-colors duration-300"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Project
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-red-500">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your project and remove all associated data from
                        our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-gray-200 hover:bg-gray-300 text-gray-800">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        {isLoading ? (
                          <>
                            <Settings className="mr-2 h-4 w-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Delete Project
                          </>
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectSettings;
