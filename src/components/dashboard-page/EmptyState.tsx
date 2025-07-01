import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import Link from 'next/link';

export default function EmptyState() {
  return (
    <Card className="animate-fade-in">
      <CardContent className="text-center py-12">
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No reports uploaded yet</h3>
        <p className="text-gray-600 mb-6">Upload your first lab report to start tracking your health parameters</p>
        <Link href="/upload">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Lab Report
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}