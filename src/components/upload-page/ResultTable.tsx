import { AlertTriangle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { HealthParameter } from "@/types/health-parameter";

interface ResultsTableProps {
  fileName?: string;
  extractedData: HealthParameter[];
  onUploadAnother: () => void;
  onViewDashboard: () => void;
}

export default function ResultsTable({
  fileName,
  extractedData,
  onUploadAnother,
  onViewDashboard,
}: ResultsTableProps) {
  return (
    <>
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Extraction Complete
              </CardTitle>
              <CardDescription>
                Found {extractedData.length} health parameters from {fileName}
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={onUploadAnother}
              className="hover:bg-gray-50"
            >
              Upload Another
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl">Extracted Health Parameters</CardTitle>
          <CardDescription className="text-gray-600">
            Review your lab results below. Abnormal values are highlighted for
            your attention.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
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
                {extractedData.map((param, index) => (
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
                        <Badge
                          variant="destructive"
                          className="flex items-center gap-1"
                        >
                          <AlertTriangle className="h-3 w-3" />
                          Needs Attention
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Check className="h-3 w-3" />
                          Normal
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">
                  Important Note
                </h4>
                <p className="text-sm text-blue-700">
                  These results are extracted using OCR technology and should be
                  verified with your original report. Always consult with your
                  healthcare provider for medical interpretation of lab results.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="w-full hover:bg-gray-50"
                onClick={onViewDashboard}
              >
                View Dashboard
              </Button>
            </Link>
            <Button onClick={onUploadAnother} className="w-full">
              Upload Another Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
