import ProjectSettings from "@/components/ProjectSettings";
import { getSettingsPageData } from "@/lib/actions/project.actions";

interface IParams {
  projectId?: string;
}

const page = async ({ params }: { params: IParams | any }) => {
  const project: any = await getSettingsPageData(params);

  return (
    <div className="absolute top-12 md:top-12 md:left-64 w-full py-10 md:w-[82vw] bg-gray-100">
      <ProjectSettings mockProject={project} />
    </div>
  );
};

export default page;
