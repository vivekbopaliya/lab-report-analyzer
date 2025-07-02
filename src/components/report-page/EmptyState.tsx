import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function EmptyState() {
  return (
    <Card className="animate-fade-in">
      <CardContent className="text-center py-12">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
        <p className="text-gray-600 mb-6">You haven't uploaded any lab reports yet. Upload your first report to get started.</p>
        <Link href="/upload" className='mx-auto flex items-center justify-center'>
          <Button>Upload Lab Report</Button>
        </Link>
      </CardContent>
    </Card>
  );
}