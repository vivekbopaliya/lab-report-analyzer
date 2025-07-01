import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

interface LoginPayload {
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await axios.post('/api/auth/signin', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Welcome back!');
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Failed to sign in';
      toast.error(msg);
    },
  });
}
