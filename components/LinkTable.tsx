"use client";

import { Link } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Pencil, Trash2, Search, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useState } from "react";
import { EditLinkModal } from "./modals/EditLinkModal";
import { DeleteLinkModal } from "./modals/DeleteLinkModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { deleteLink, updateLink } from "@/lib/actions/link.actions";

interface Props {
  initialLinks: Link[];
}

const LinkTable: React.FC<Props> = ({ initialLinks }) => {
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null);
  const [linkToEdit, setLinkToEdit] = useState<Link | null>(null);
  const linksPerPage = 7;
  const [isLoading, setIsLoading] = useState(false);

  const filteredLinks = links.filter(
    (link) =>
      link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = filteredLinks.slice(indexOfFirstLink, indexOfLastLink);

  const totalPages = Math.ceil(filteredLinks.length / linksPerPage);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${text} has been copied!`);
  };

  const openDeleteModal = (id: string) => {
    setLinkToDelete(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setLinkToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleDeleteLink = async () => {
    if (!linkToDelete) return;

    setIsLoading(true);
    try {
      await deleteLink(linkToDelete);
      setLinks((prevLinks) =>
        prevLinks.filter((link) => link.id !== linkToDelete)
      );
      toast.success("The link has been successfully deleted");
    } catch (error) {
      toast.error("Something went wrong!");
    }

    closeDeleteModal();
    setIsLoading(false);
  };

  const openEditModal = (link: Link) => {
    setLinkToEdit(link);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setLinkToEdit(null);
    setEditModalOpen(false);
  };

  const handleEditLink = async (shortUrl: string, destinationUrl: string) => {
    if (!linkToEdit) return;

    setIsLoading(true);
    try {
      await updateLink(linkToEdit.id, shortUrl, destinationUrl);
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === linkToEdit.id
            ? { ...link, shortUrl, destination: destinationUrl }
            : link
        )
      );
      toast.success("The link has been successfully updated");
    } catch (error) {
      toast.error("Something went wrong!");
    }

    closeEditModal();
    setIsLoading(false);
  };

  return (
    <div className="absolute top-5 md:top-14 md:left-64 w-full py-10 md:w-[83vw] bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-6xl shadow-lg mx-auto overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center bg-gray-100 rounded-full p-2">
              <Search className="mx-2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search links..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow border-none bg-transparent focus:ring-0 focus:outline-none"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-bold text-[#9b7bf7]">
                      Short URL
                    </TableHead>
                    <TableHead className="font-bold text-[#9b7bf7]">
                      Destination
                    </TableHead>
                    <TableHead className="font-bold text-[#9b7bf7]">
                      Created
                    </TableHead>
                    <TableHead className="font-bold text-[#9b7bf7]">
                      Clicks
                    </TableHead>
                    <TableHead className="font-bold text-[#9b7bf7]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentLinks.map((link, index) => (
                    <motion.tr
                      key={link.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="font-medium text-[#9b7bf7] truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[35vw] md:max-w-xs">
                        linktoit.in/{link.shortUrl}
                      </TableCell>
                      <TableCell className="truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[35vw] md:max-w-xs">
                        {link.destination}
                      </TableCell>
                      <TableCell className="truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[35vw] md:max-w-xs">
                        {link.createdAt.toISOString().split("T")[0]}
                      </TableCell>
                      <TableCell className="truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[35vw] md:max-w-xs">
                        <span className="inline-flex items-center bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs font-medium">
                          <BarChart2 className="mr-1 h-3 w-3" /> {link.clicks}
                        </span>
                      </TableCell>
                      <TableCell className="truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[35vw] md:max-w-xs">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              copyToClipboard(`linktoit.in/${link.shortUrl}`)
                            }
                            className="hover:bg-[#9b7bf7] hover:text-white transition-colors"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => openEditModal(link)}
                            className="hover:bg-[#9b7bf7] hover:text-white transition-colors duration-200"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => openDeleteModal(link.id)}
                            className="hover:bg-red-500 hover:text-white transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    isActive={currentPage !== totalPages}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    isActive={currentPage !== totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      </motion.div>

      <DeleteLinkModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteLink}
      />

      <EditLinkModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        onSave={handleEditLink}
        initialShortUrl={linkToEdit?.shortUrl || ""}
        initialDestinationUrl={linkToEdit?.destination || ""}
      />
    </div>
  );
};

export default LinkTable;
