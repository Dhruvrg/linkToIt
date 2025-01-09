"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { motion } from "framer-motion";

interface GeneratePDFButtonProps {
  reportData: any;
}

export default function GeneratePDFButton({
  reportData,
}: GeneratePDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = () => {
    setIsGenerating(true);
    const doc = new jsPDF();

    // Add background color
    doc.setFillColor(245, 245, 255);
    doc.rect(
      0,
      0,
      doc.internal.pageSize.width,
      doc.internal.pageSize.height,
      "F"
    );

    // Add header
    doc.setFillColor(155, 123, 247); // #9b7bf7
    doc.rect(0, 0, doc.internal.pageSize.width, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Performance Report", 105, 25, { align: "center" });

    // Add total links
    doc.setFillColor(200, 200, 255);
    doc.roundedRect(20, 50, 170, 30, 3, 3, "F");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Total Links", 30, 65);
    doc.setFontSize(20);
    doc.text(reportData.totalLinks.toString(), 30, 75);

    // Add best performing link
    doc.setFillColor(255, 200, 200);
    doc.roundedRect(20, 90, 170, 40, 3, 3, "F");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Best Performing Link", 30, 105);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`URL: ${reportData.bestLink.url}`, 30, 115);
    doc.text(`Total Clicks: ${reportData.bestLink.totalClicks}`, 30, 125);

    // Add top performers table
    doc.autoTable({
      startY: 140,
      head: [["Category", "Name", "Clicks"]],
      body: [
        [
          "Platform",
          reportData.topPlatform.name,
          reportData.topPlatform.clicks,
        ],
        [
          "Campaign",
          reportData.topCampaign.name,
          reportData.topCampaign.clicks,
        ],
        ["Medium", reportData.topMedium.name, reportData.topMedium.clicks],
        ["Term", reportData.topTerm.name, reportData.topTerm.clicks],
        ["Content", reportData.topContent.name, reportData.topContent.clicks],
      ],
      headStyles: { fillColor: [155, 123, 247], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [245, 245, 255] },
    });

    // Add performance changes
    doc.setFillColor(200, 255, 200);
    doc.roundedRect(20, doc.lastAutoTable.finalY + 20, 170, 50, 3, 3, "F");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Performance Changes", 30, doc.lastAutoTable.finalY + 35);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    reportData.performanceChanges.forEach((change: any, index: number) => {
      const color = change.change >= 0 ? "rgb(0, 128, 0)" : "rgb(255, 0, 0)";
      doc.setTextColor(color);
      doc.text(
        `${change.period}: ${change.change}%`,
        30,
        doc.lastAutoTable.finalY + 45 + index * 10
      );
    });

    doc.save("performance_report.pdf");
    setIsGenerating(false);
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={generatePDF}
        disabled={isGenerating}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Download className="w-5 h-5 mr-2" />
        {isGenerating ? "Generating PDF..." : "Download PDF Report"}
      </Button>
    </motion.div>
  );
}
