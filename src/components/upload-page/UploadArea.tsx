import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, Image } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";

interface UploadAreaProps {
  onFileUpload: (file: File) => void;
}

export default function UploadArea({ onFileUpload }: UploadAreaProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF, JPG, or PNG file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      onFileUpload(file);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    multiple: false,
  });

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Upload Your Lab Report</CardTitle>
        <CardDescription className="text-gray-600">
          Upload PDF, JPG, or PNG files up to 5MB. Our OCR technology will
          extract health parameters automatically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-3">
              <FileText className="h-10 w-10 text-gray-400" />
              <Image className="h-10 w-10 text-gray-400" />
            </div>
            {isDragActive ? (
              <p className="text-blue-600 font-medium text-lg">
                Drop your file here...
              </p>
            ) : (
              <>
                <p className="text-gray-600 text-lg">
                  <span className="font-medium text-blue-600 hover:underline">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-sm text-gray-500">PDF, JPG, PNG (max 5MB)</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
