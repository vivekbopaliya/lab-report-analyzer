import { Loader2, Upload } from "lucide-react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProcessingStatusProps {
  fileName: string;
}

export default function ProcessingStatus({ fileName }: ProcessingStatusProps) {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Upload className="h-5 w-5 text-blue-600 animate-pulse" />
          Processing {fileName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Loader2 className="animate-spin h-10 w-10" />
      </CardContent>
    </Card>
  );
}
