"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  PlusCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  BarChart2,
  LinkIcon,
  Settings,
  LogOut,
  User,
} from "lucide-react";
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
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

interface Props {
  currentUser: SafeUser;
}

const Navbar: React.FC<Props> = ({ currentUser }) => {
  const projects = useProjectStore((state) => state.projects);
  const [selectedProject, setSelectedProject] = React.useState(projects[0]);
  const [isOpen, setIsOpen] = React.useState(false);
  const { onOpen } = useCreateProjectModal();
  const pathname = usePathname();
  const router = useRouter();
  const projectId = pathname.split("/")[2];

  const navItems = [
    { name: "Create", href: `/dashboard/${projectId}`, icon: PlusCircle },
    {
      name: "Analytics",
      href: `/dashboard/${projectId}/analytics`,
      icon: BarChart2,
    },
    { name: "Links", href: `/dashboard/${projectId}/links`, icon: LinkIcon },
    {
      name: "Settings",
      href: `/dashboard/${projectId}/settings`,
      icon: Settings,
    },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            href={item.href}
            className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 ease-in-out ${
              pathname === item.href
                ? "bg-[#9b7bf7]/10 text-[#9b7bf7] font-bold"
                : "text-gray-600 hover:bg-[#9b7bf7]/5 hover:text-[#9b7bf7]"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-lg font-medium">{item.name}</span>
          </Link>
        </motion.div>
      ))}
    </>
  );

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
      toast.error("Upgrade to Professional for more projects.", {
        duration: 3000,
        style: {
          background: "#ffe3e3",
          color: "#e03131",
          border: "1px solid #ffa8a8",
        },
        icon: "⚠️",
      });
    } else if (planType === "Professional" && length >= 3) {
      toast.error("Upgrade to Business for more projects.", {
        duration: 3000,
        style: {
          background: "#ffe3e3",
          color: "#e03131",
          border: "1px solid #ffa8a8",
        },
        icon: "⚠️",
      });
    } else if (planType === "Business" && length >= 5) {
      toast.error("Contact the developer for more projects.", {
        duration: 3000,
        style: {
          background: "#ffe3e3",
          color: "#e03131",
          border: "1px solid #ffa8a8",
        },
        icon: "📞",
      });
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
    <div>
      <nav className="bg-white border-b border-gray-200 md:px-6 px-4 py-3 fixed md:left-64 left-0 right-0 top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="text-[#9b7bf7] hidden md:block">
                {selectedProject?.name}
              </span>
              <ChevronRight className="h-5 w-5 mx-2 text-gray-400 hidden md:block" />
              <Button
                onClick={() => setIsOpen(true)}
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
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={currentUser?.image || ""}
                      alt={currentUser?.name || "User"}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-[#9b7bf7] to-[#7c5ce9] text-white">
                      {currentUser?.name
                        ? currentUser.name.charAt(0).toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 p-2"
                sideOffset={5}
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {currentUser?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:bg-red-100 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      <div className="flex items-center md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-[#9b7bf7] hover:bg-[#9b7bf7]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9b7bf7] transition-all duration-200 ease-in-out"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] bg-gradient-to-br from-white to-[#9b7bf7]/5 p-0"
          >
            <VisuallyHidden>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <Link
                  href={`/dashboard/${projectId}`}
                  className="flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="bg-white p-[1px] rounded-full">
                    <Image
                      className="rounded-full"
                      height="35"
                      width="35"
                      alt="Logo"
                      src={"/logo.png"}
                    />
                  </div>
                  <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#9b7bf7] to-[#7c5ce9] text-transparent bg-clip-text">
                    LinkToIt
                  </span>
                </Link>
              </div>
              <div className="flex-grow overflow-y-auto py-6 px-4">
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <NavLinks />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="p-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  © 2023 LinkToIt. All rights reserved.
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
