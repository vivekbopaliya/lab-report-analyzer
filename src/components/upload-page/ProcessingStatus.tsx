import { Loader2, Upload } from "lucide-react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";

interface ProcessingStatusProps {
  fileName: string;
}

export default function ProcessingStatus({ fileName }: ProcessingStatusProps) {
  return (
    <Card className="animate-fade-in min-h-[160px] sm:min-h-[200px] max-w-full mx-auto shadow-lg px-2 sm:px-0">
      <CardHeader className="px-2 sm:px-6 py-3 sm:py-4">
        <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-xl font-semibold truncate">
          <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 animate-pulse" />
          <span className="truncate max-w-[120px] xs:max-w-[180px] sm:max-w-none text-xs xs:text-sm sm:text-base">{fileName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-[120px] sm:min-h-[200px] flex-col items-center justify-center gap-3 sm:gap-6 py-4 sm:py-8 px-2 sm:px-6">
        <Loader2 className="animate-spin h-8 w-8 xs:h-10 xs:w-10 sm:h-14 sm:w-14 text-blue-500" />
      </CardContent>
    </Card>
  );
}
