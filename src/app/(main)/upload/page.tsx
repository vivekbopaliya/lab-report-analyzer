"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadArea from "@/components/upload-page/UploadArea";
import ProcessingStatus from "@/components/upload-page/ProcessingStatus";
import ResultsTable from "@/components/upload-page/ResultTable";
import ErrorState from "@/components/upload-page/ErrorState";
import { useFileProcessing } from "@/hooks/file-processing";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const { data, isLoading, error, processFile, reset } = useFileProcessing();

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    processFile(uploadedFile);
  };

  const handleReset = () => {
    setFile(null);
    reset();
  };

  const handleViewDashboard = () => {
    router.push("/dashboard");
  };

  if (!file) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-grow min-w-7/12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <UploadArea onFileUpload={handleFileUpload} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow max-w-4xl min-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && <ProcessingStatus fileName={file.name} />}

        {data?.parameters && (
          <ResultsTable
            fileName={file.name}
            extractedData={data.parameters}
            onUploadAnother={handleReset}
            onViewDashboard={handleViewDashboard}
          />
        )}

        {error && <ErrorState onTryAgain={handleReset} message={error} />}
      </main>
    </div>
  );
}
