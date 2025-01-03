"use client";

import ClientOnly from "@/components/ClientOnly";
import Loader from "@/components/Loader";
import CreateProjectModal from "@/components/modals/CreateProjectModal";
import Navbar from "@/components/navbar/Navbar";
import SideBar from "@/components/SideBar";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { getProjects } from "@/lib/actions/project.actions";
import { useProjectStore } from "@/lib/store";
import { SafeUser } from "@/types";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<SafeUser>();
  const [isLoading, setIsLoading] = useState(true);
  const setProjects = useProjectStore((state) => state.setProjects);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser();

        if (!user || user.plan === false) {
          router.push("/");
          return;
        }

        setCurrentUser(user);

        const projects = await getProjects();
        if (!projects) return;

        setProjects(projects);
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentUser) {
    return;
  }

  return (
    <section>
      <ClientOnly>
        <CreateProjectModal />
        <Navbar currentUser={currentUser} />
      </ClientOnly>
      <main className="bg-gray-100">
        <SideBar />
        <div>{children}</div>
      </main>
    </section>
  );
}
