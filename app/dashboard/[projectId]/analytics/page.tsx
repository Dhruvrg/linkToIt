import GraphSection from "@/components/GraphSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import { getAnalytics } from "@/lib/actions/link.actions";
import { processData } from "@/lib/socialMediaDataProcessor";

interface IParams {
  projectId?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const { clicksPerDay, links } = await getAnalytics(params);
  const socialMediaData = processData(links);

  return (
    <div className="absolute top-12 md:top-14 md:left-64 w-full py-10 md:w-[83vw] bg-gray-100">
      <div className="max-w-7xl mx-auto flex justify-center gap-10">
        {clicksPerDay !== undefined && <GraphSection list={clicksPerDay} />}
        <SocialMediaSection data={socialMediaData} />
      </div>
    </div>
  );
};

export default page;
