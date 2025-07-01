import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useDashboardStats = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await axios.get("/api/reports");
      return res.data;
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || "Failed to fetch reports";
      toast.error(msg);
    },
  });
};

export const useFetchTrendData = () => {
  return useMutation({
    mutationFn: async (parameterName: string) => {
      const res = await axios.get(`/api/parameters/history?name=${encodeURIComponent(parameterName)}`);
      return res.data;
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || "Failed to fetch trend data";
      toast.error(msg);
    },
  });
}