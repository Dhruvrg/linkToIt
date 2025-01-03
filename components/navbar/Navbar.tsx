"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { PlusCircle, ChevronDown, ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SafeUser } from "@/types";
import useCreateProjectModal from "@/hooks/useCreateProjectModel";
import { Project } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProjectStore } from "@/lib/store";
import useMenuToggle from "@/hooks/useMenuToggle";

interface Props {
  currentUser: SafeUser;
}

const Navbar: React.FC<Props> = ({ currentUser }) => {
  const projects = useProjectStore((state) => state.projects);
  const [selectedProject, setSelectedProject] = React.useState(projects[0]);
  const { onOpen } = useCreateProjectModal();
  const pathname = usePathname();
  const router = useRouter();
  const menuToggle = useMenuToggle();

  React.useEffect(() => {
    const id = pathname.split("/")[2];
    if (id === undefined) return;
    const project = projects.find((project) => project.id === id);
    if (project === undefined) return;
    setSelectedProject(project);
  }, [pathname, projects]);

  const handleClick = (project: Project, path: string) => {
    setSelectedProject(project);
    let section = path.split("/")[3];
    if (section === undefined) section = "";
    router.push(`/dashboard/${project?.id}/${section}`);
  };

  const getCurrentPageName = (path: string) => {
    const section = path.split("/")[3];
    if (section === undefined) return "Create";
    return section;
  };

  const handleCreateProject = () => {
    const { planType } = currentUser;
    const length = projects?.length;

    if (planType === "Basic" && length >= 1) {
      toast.error("Upgrade to Professional for more projects.");
    } else if (planType === "Professional" && length >= 3) {
      toast.error("Upgrade to Business for more projects.");
    } else if (planType === "Business" && length >= 5) {
      toast.error("Contact the developer for more projects.");
    } else {
      onOpen();
    }
  };

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <nav className="bg-white border-b border-gray-200 md:px-6 px-4 py-3 fixed md:left-64 left-0 right-0 top-0 z-10 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800 flex items-center">
            <span className="text-[#9b7bf7] hidden md:block">
              {selectedProject?.name}
            </span>
            <ChevronRight className="h-5 w-5 mx-2 text-gray-400 hidden md:block" />
            <Button
              onClick={() => menuToggle.onOpen()}
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
            >
              <Menu
                style={{ height: "30px", width: "30px", color: "#9b7bf7" }}
              />
            </Button>
            <span className="capitalize mt-1 md:mt-0">
              {getCurrentPageName(pathname)}
            </span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor: `#${selectedProject?.id?.substring(
                        18,
                        24
                      )}`,
                    }}
                  ></div>
                  <span className="mr-2 font-medium">
                    {selectedProject?.name}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {projects.map((project: Project) => (
                <DropdownMenuItem
                  key={project.id}
                  onClick={() => handleClick(project, pathname)}
                  className="flex items-center py-2"
                >
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor: `#${project.id.substring(18, 24)}`,
                    }}
                  ></div>
                  {project.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleCreateProject()}
                className="text-[#9b7bf7]"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Add New Project</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser?.image || ""} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Account Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleLogout()}
                className="text-red-600"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
