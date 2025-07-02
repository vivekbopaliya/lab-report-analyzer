import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
       await axios.post('/api/auth/signout');
    },
    onSuccess: () => {
      toast.success('Sign out succesfully!');
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Failed to sign out';
      toast.error(msg);
    },
  });
}