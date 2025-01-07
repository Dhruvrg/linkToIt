"use client";

import useUploadModal from "@/hooks/useCreateProjectModel";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Folder, FileText, PlusCircle, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProjectValidation } from "@/lib/validation";
import toast from "react-hot-toast";
import { createProject } from "@/lib/actions/project.actions";
import { useRouter } from "next/navigation";
import { useProjectStore } from "@/lib/store";

const CreateProjectModal = () => {
  const { isOpen, onClose } = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const addProject = useProjectStore((state) => state.addProject);
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateProjectValidation>>({
    resolver: zodResolver(CreateProjectValidation),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (values: z.infer<typeof CreateProjectValidation>) => {
    setIsLoading(true);
    try {
      const newProject = await createProject(values.name, values.description);

      if (!newProject) return;

      addProject(newProject);
      form.reset({ name: "", description: "" });
      toast.success("Project Created Successfully!", {
        duration: 4000,
        style: {
          background: "#f0fdf4",
          color: "#15803d",
          border: "1px solid #86efac",
        },
        icon: "🎉",
      });
      router.push(`/dashboard/${newProject?.id}`);
    } catch (error) {
      toast.error("Failed to create project!", {
        duration: 4000,
        style: {
          background: "#fef2f2",
          color: "#991b1b",
          border: "1px solid #f87171",
        },
        icon: "❌",
      });
    } finally {
      setIsLoading(false);
    }

    onClose();
    setIsLoading(false);
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-full sm:w-3/4 md:w-2/3 lg:w-2/4 my-6 mx-auto h-full lg:h-auto md:h-auto">
        <div className="fixed inset-0 h-full w-full translate duration-300 translate-y-0 opacity-100 overflow-hidden sm:relative sm:overflow-auto">
          <Card className="w-full h-full max-w-md mx-auto shadow-lg border-[#9b7bf7] sm:rounded-lg rounded-none">
            <CardHeader className="bg-gradient-to-r from-[#9b7bf7] to-[#7c5ce9] text-white sm:rounded-t-lg rounded-none relative">
              <CardTitle className="text-2xl font-bold flex items-center">
                <PlusCircle className="mr-2" />
                Create New Project
              </CardTitle>
              <CardDescription className="text-white/80">
                Start your new link management project
              </CardDescription>
              <button
                onClick={() => onClose()}
                className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex-1 space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium text-gray-700 flex items-center"
                        >
                          <Folder className="mr-2 h-4 w-4 text-[#9b7bf7]" />
                          Project Name
                        </Label>
                        <FormControl>
                          <Input
                            {...field}
                            id="name"
                            placeholder="Enter project name"
                            className="border-[#9b7bf7]/30 focus:border-[#9b7bf7] focus:ring-[#9b7bf7]"
                          />
                        </FormControl>
                        {fieldState?.error && (
                          <p className="text-xs text-red-500">
                            {fieldState.error.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <Label
                          htmlFor="description"
                          className="text-sm font-medium text-gray-700 flex items-center"
                        >
                          <FileText className="mr-2 h-4 w-4 text-[#9b7bf7]" />
                          Project Description
                        </Label>
                        <FormControl>
                          <Textarea
                            {...field}
                            id="description"
                            placeholder="Enter project description"
                            rows={4}
                            className="border-[#9b7bf7]/30 focus:border-[#9b7bf7] focus:ring-[#9b7bf7]"
                          />
                        </FormControl>
                        {fieldState?.error && (
                          <p className="text-xs text-red-500">
                            {fieldState.error.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-[#9b7bf7] hover:bg-[#8a6ae6] text-white transition-colors duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Project"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="bg-gray-50 rounded-b-lg">
              <p className="text-xs text-gray-500 text-center w-full">
                Your project will be securely stored and can be managed from
                your dashboard.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
