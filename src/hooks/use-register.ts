import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await axios.post('/api/auth/signup', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Account created successfully!');
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Failed to create account';
      toast.error(msg);
    },
  });
}
