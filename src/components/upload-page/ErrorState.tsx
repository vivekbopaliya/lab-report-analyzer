import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorStateProps {
  onTryAgain: () => void;
  message?: string;
}

export default function ErrorState({ onTryAgain, message }: ErrorStateProps) {
  return (
    <Card className="animate-fade-in">
      <CardContent className="text-center py-12">
        <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Processing Failed</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {message || "We couldn't extract data from your file. Please try a clearer image or different file."}
        </p>
        <Button onClick={onTryAgain} className="px-6 flex items-center mx-auto justify-center gap-2">
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}