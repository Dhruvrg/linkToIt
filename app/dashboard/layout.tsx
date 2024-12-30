import ClientOnly from "@/components/ClientOnly";
import CreateProjectModal from "@/components/modals/CreateProjectModal";
import Navbar from "@/components/navbar/Navbar";
import SideBar from "@/components/SideBar";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { getProjects } from "@/lib/actions/project.actions";
import { redirect } from "next/navigation";
import React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  //if (!currentUser || !currentUser.plan) return redirect("/");
  if (!currentUser) return redirect("/");

  const projects = await getProjects();

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
