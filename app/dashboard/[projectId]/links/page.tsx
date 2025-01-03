import EmptyState from "@/components/EmptyState";
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
    <>
      {links.length !== 0 && <LinkTable initialLinks={links} />}
      {links.length === 0 && <EmptyState />}
    </>
  );
};

export default page;
