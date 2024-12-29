import LinkTable from "@/components/LinkTable";
import { getLinks } from "@/lib/actions/link.actions";
import { Link } from "@prisma/client";
import React from "react";

interface IParams {
  projectId?: string;
}

const page = async ({ params }: { params: IParams | any }) => {
  const links: Link[] = await getLinks(params);

  return (
    <div className="absolute top-12 md:top-14 md:left-64 w-full py-10 md:w-[83vw] bg-gray-100">
      {links.length !== 0 && <LinkTable initialLinks={links} />}
      {links.length === 0 && <div className="text-center">No Data</div>}
    </div>
  );
};

export default page;
