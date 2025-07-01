import { AlertTriangle, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LabReportData } from "@/lib/reports";
import { formatFileSize } from "@/lib/utils";

interface ReportsListProps {
  reports: LabReportData[];
  selectedReportId?: string;
  onSelectReport: (report: LabReportData) => void;
}

export default function ReportsList({
  reports,
  selectedReportId,
  onSelectReport,
}: ReportsListProps) {

  return (
    <Card className="animate-fade-in lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-xl">
          Your Reports ({reports.length})
        </CardTitle>
        <CardDescription className="text-gray-600">
          Click on a report to view details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {reports.map((report) => (
          <div
            key={report.id}
            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedReportId === report.id
                ? "bg-blue-50 border-blue-200"
                : "bg-white hover:bg-gray-50"
            }`}
            onClick={() => onSelectReport(report)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {report.fileName}
                </p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(report.uploadedAt).toLocaleDateString()}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formatFileSize(report.fileSize)} • {report.parameters.length}{" "}
                  parameters
                </p>
              </div>
              {report.parameters.some((p) => p.isAbnormal) && (
                <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 ml-2" />
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
