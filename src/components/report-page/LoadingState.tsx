import { Activity } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Activity className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading reports...</p>
      </div>
    </div>
  );
}