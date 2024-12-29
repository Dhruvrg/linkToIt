import ClientOnly from "@/components/ClientOnly";
import CreateShortUrlForm from "@/components/form/CreateShortUrlForm";
import { getProjectById } from "@/lib/actions/project.actions";
import { Project } from "@prisma/client";

interface IParams {
  projectId?: string;
}

const page = async ({ params }: { params: IParams | any }) => {
  const project: Project | null = await getProjectById(params);

  if (!project) return;

  return (
    <ClientOnly>
      <div className="absolute top-12 md:top-14 md:left-64 w-full pt-1 md:w-[83vw] bg-gray-100">
        <CreateShortUrlForm projectId={project.id} />
      </div>
    </ClientOnly>
  );
};

export default page;
