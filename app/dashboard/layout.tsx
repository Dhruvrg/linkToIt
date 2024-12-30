"use client";

import ClientOnly from "@/components/ClientOnly";
import CreateProjectModal from "@/components/modals/CreateProjectModal";
import Navbar from "@/components/navbar/Navbar";
import SideBar from "@/components/SideBar";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { getProjects } from "@/lib/actions/project.actions";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      const projects = await getProjects();

      if (!user) {
        router.push("/");
        return;
      }
      if (user.plan === false) {
        router.push("/");
        return;
      }
      setCurrentUser(user);
    }
    fetchUser();
  }, []);

  if (!currentUser) {
    // Optionally render a loader here
    return null;
  }

  return (
    <section>
      <ClientOnly>
        <CreateProjectModal />
        <Navbar currentUser={currentUser} projects={projects} />
      </ClientOnly>
      <main className="bg-gray-100">
        <SideBar />
        <div>{children}</div>
      </main>
    </section>
  );
}
