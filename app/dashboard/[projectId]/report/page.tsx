import ReportData from "@/components/report/ReportData";
import { getAnalytics } from "@/lib/actions/link.actions";
import { generateReportData } from "@/lib/utils";

interface IParams {
  projectId?: string;
}

const page = async ({ params }: { params: IParams | any }) => {
  const { clicksPerDay, links } = await getAnalytics(params);
  const reportData = generateReportData(links, clicksPerDay);

  return (
    <div className="absolute top-12 md:top-14 md:left-60 w-full py-8 md:w-[83vw] bg-gray-100 min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 px-4 sm:px-6 lg:pl-12">
      <ReportData reportData={reportData} />
    </div>
  );
};

export default page;
