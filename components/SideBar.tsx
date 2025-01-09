"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  PlusCircle,
  BarChart2,
  LinkIcon,
  Settings,
  FileText,
} from "lucide-react";

export default function SideBar() {
  const pathname = usePathname();
  const projectId = pathname.split("/")[2];

  return (
    <SidebarProvider>
      <Sidebar className="border-r hidden md:block border-[#9b7bf7]/10 bg-gradient-to-b from-white to-[#9b7bf7]/5 w-64">
        <SidebarHeader className="p-6">
          <Link href={`/dashboard/${projectId}`}>
            <Button className="w-full bg-[#9b7bf7] hover:bg-[#8a6ae6] text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 rounded-xl h-12">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Link
            </Button>
          </Link>
        </SidebarHeader>
        <SidebarContent className="px-4">
          <SidebarMenu>
            <SidebarMenuItem className="mb-1">
              <SidebarMenuButton
                asChild
                className="w-full hover:bg-[#9b7bf7]/10 transition-colors duration-200"
              >
                <div className="flex items-center px-4 py-3 rounded-lg">
                  <BarChart2 className="mr-3 h-5 w-5 text-[#9b7bf7]" />
                  <span className="text-base font-medium">Overview</span>
                </div>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === `/dashboard/${projectId}/links`}
                    className="w-full hover:bg-[#9b7bf7]/5 transition-colors duration-200"
                  >
                    <Link
                      href={`/dashboard/${projectId}/links`}
                      className="flex items-center px-8 py-2 rounded-md"
                    >
                      <LinkIcon className="mr-3 h-4 w-4 text-[#9b7bf7]" />
                      <span className="text-sm">Links</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === `/dashboard/${projectId}/analytics`}
                    className="w-full hover:bg-[#9b7bf7]/5 transition-colors duration-200"
                  >
                    <Link
                      href={`/dashboard/${projectId}/analytics`}
                      className="flex items-center px-8 py-2 rounded-md"
                    >
                      <BarChart2 className="mr-3 h-4 w-4 text-[#9b7bf7]" />
                      <span className="text-sm">Analytics</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === `/dashboard/${projectId}/report`}
                    className="w-full hover:bg-[#9b7bf7]/5 transition-colors duration-200"
                  >
                    <Link
                      href={`/dashboard/${projectId}/report`}
                      className="flex items-center px-8 py-2 rounded-md"
                    >
                      <FileText className="mr-3 h-4 w-4 text-[#9b7bf7]" />
                      <span className="text-sm">Report</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
            <SidebarMenuItem className="mb-1">
              <SidebarMenuButton
                asChild
                className="w-full hover:bg-[#9b7bf7]/10 transition-colors duration-200"
              >
                <div className="flex items-center px-4 py-3 rounded-lg">
                  <Settings className="mr-3 h-5 w-5 text-[#9b7bf7]" />
                  <span className="text-base font-medium">Configuration</span>
                </div>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === `/dashboard/${projectId}/settings`}
                    className="w-full hover:bg-[#9b7bf7]/5 transition-colors duration-200"
                  >
                    <Link
                      href={`/dashboard/${projectId}/settings`}
                      className="flex items-center px-8 py-2 rounded-md"
                    >
                      <Settings className="mr-3 h-4 w-4 text-[#9b7bf7]" />
                      <span className="text-sm">Settings</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
            <div className="h-px bg-gradient-to-r from-transparent via-[#9b7bf7]/20 to-transparent my-4"></div>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-6 mt-auto">
          <div className="bg-[#9b7bf7]/10 rounded-lg p-4 text-center">
            <p className="text-xs text-[#9b7bf7] font-medium">
              © 2024 LinkToIt
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              All rights reserved
            </p>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
