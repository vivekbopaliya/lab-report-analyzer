"use client";

import { useEffect, useState } from "react";
import ReportsList from "./ReportList";
import ReportDetails from "./ReportDetails";
import { LabReportData } from "@/lib/reports";

export default function ReportsWrapper({
  reports,
}: {
  reports: LabReportData[];
}) {
  const [selectedReport, setSelectedReport] = useState<LabReportData | null>(
    reports[0] || null
  );

  useEffect(() => {
    setSelectedReport(reports[0] || null);
  }, [reports]);

  return (
    <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ReportsList
          reports={reports}
          selectedReportId={selectedReport?.id}
          onSelectReport={setSelectedReport}
        />
        <ReportDetails report={selectedReport} />
      </div>
    </main>
  );
}
