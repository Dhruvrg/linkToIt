import EmptyState from "@/components/EmptyState";
import GraphSection from "@/components/GraphSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import UTMCampaignSection from "@/components/utmTags/UTMCampaignSection";
import UTMContentSection from "@/components/utmTags/UTMContentSection";
import UTMMediumSection from "@/components/utmTags/UTMMediumSection";
import UTMTermSection from "@/components/utmTags/UTMTermSection";
import { getAnalytics } from "@/lib/actions/link.actions";
import { socialMediaDataProcessor, utmDataProcessor } from "@/lib/utils";

interface IParams {
  projectId?: string;
}

const page = async ({ params }: { params: IParams | any }) => {
  const { clicksPerDay, links } = await getAnalytics(params);
  const socialMediaData = socialMediaDataProcessor(links);
  const campaignData = utmDataProcessor(links, "utmCampaign");
  const mediumData = utmDataProcessor(links, "utmMedium");
  const termData = utmDataProcessor(links, "utmTerm");
  const contentData = utmDataProcessor(links, "utmContent");
  const clicks = links.reduce((total, link) => total + link.totalClicks, 0);

  return (
    <>
      {links.length !== 0 && (
        <div className="absolute top-12 md:top-14 md:left-60 w-full py-8 md:w-[83vw] bg-gray-100">
          <div className="max-w-7xl md:mx-auto md:pl-5 md:flex justify-center gap-10 md:w-[80vw] mx-4 space-y-4 md:space-y-0">
            {clicksPerDay !== undefined && <GraphSection list={clicksPerDay} />}
            <SocialMediaSection data={socialMediaData} />
          </div>
          {clicks && (
            <div className="md:w-[80vw] md:mt-10 mt-4 md:pl-5 md:mx-auto md:flex justify-between  mx-4 space-y-4 md:space-y-0">
              <UTMMediumSection data={mediumData} />
              <UTMCampaignSection data={campaignData} />
              <UTMTermSection data={termData} />
              <UTMContentSection data={contentData} />
            </div>
          )}
        </div>
      )}
      {links.length === 0 && <EmptyState />}
    </>
  );
};

export default page;
