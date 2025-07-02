import { AlertTriangle, FileText, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LabReportData } from "@/lib/reports";
import { formatFileSize } from "@/lib/utils";

interface ReportDetailsProps {
  report: LabReportData | null;
}

export default function ReportDetails({ report }: ReportDetailsProps) {
  
  console.log(report)
  
  if (!report) {
    return (
      <Card className="animate-fade-in lg:col-span-2">
        <CardContent className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select a Report
          </h3>
          <p className="text-gray-600">
            Choose a report from the list to view its details and extracted
            parameters.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          {report.fileName}
        </CardTitle>
        <CardDescription>
          Uploaded on {new Date(report.uploadedAt).toLocaleDateString()} •{" "}
          {formatFileSize(report.fileSize)} • {report.parameters.length}{" "}
          parameters extracted
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Parameter</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Normal Range</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.parameters.map((param, index) => (
                  <TableRow
                    key={index}
                    className={param.isAbnormal ? "bg-red-50" : ""}
                  >
                    <TableCell className="font-medium">
                      {param.parameter}
                    </TableCell>
                    <TableCell
                      className={
                        param.isAbnormal ? "text-red-600 font-medium" : ""
                      }
                    >
                      {param.value}
                    </TableCell>
                    <TableCell>{param.unit}</TableCell>
                    <TableCell>{param.normalRange}</TableCell>
                    <TableCell>
                      {param.isAbnormal ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant="destructive"
                              className="flex items-center gap-1 w-fit cursor-help"
                            >
                              <AlertTriangle className="h-3 w-3" />
                              Needs Attention
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">
                              {param.aiInsight || "This value is outside the normal range and may need attention."}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          Normal
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
        </div>

        {report.parameters.some((p) => p.isAbnormal) && (
          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-900 mb-1">
                  Abnormal Values Detected
                </h4>
                <p className="text-sm text-red-700">
                  Some of your test results are outside the normal range. Please
                  consult with your healthcare provider for proper
                  interpretation and guidance.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}