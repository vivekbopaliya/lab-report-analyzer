import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useReports() {
  const {
    mutateAsync,
    data,
    isPending: isLoading,
  } = useMutation({
    mutationFn: async () => {
      const res = await axios.get("/api/reports");
      return res.data;
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || "Failed to fetch reports";
      toast.error(msg);
    },
  });

  return {
    reports: data?.reports || [],
    isLoading,
    refetch: mutateAsync,
  };
}
