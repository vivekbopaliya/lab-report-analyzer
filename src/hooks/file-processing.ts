import { useMutation } from '@tanstack/react-query';
import { HealthParameter } from '@/types/health-parameter';

interface ProcessingResult {
  parameters: HealthParameter[];
}

const processFileApi = async (file: File): Promise<ProcessingResult> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/process-file', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorMsg = 'Failed to process file';
    try {
      const errorData = await response.json();
      if (errorData.message) errorMsg = errorData.message;
    } catch {}
    throw new Error(errorMsg);
  }

  return response.json();
};

export function useFileProcessing() {
  const mutation = useMutation({
    mutationFn: processFileApi,
  });

  return {
    data: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
    processFile: mutation.mutate,
    reset: mutation.reset,
  };
}