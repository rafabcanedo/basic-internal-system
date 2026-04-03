import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService, ISignInRequest, ISignUpRequest, IAuthResponse } from "@/services/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface IRestError {
  message: string;
  error: string;
  code: number;
  causes?: Array<{
    field: string;
    message: string;
  }>;
}

export function useAuthMutations() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation<IAuthResponse, IRestError, ISignInRequest>({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      toast.success(data.message || "Login realizado com sucesso!");
      
      queryClient.clear();
      
      router.push("/dashboard");
      
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || "Credenciais inválidas ou erro no servidor");
    },
  });

  const registerMutation = useMutation<{ message: string }, IRestError, ISignUpRequest>({
    mutationFn: authService.signUp,
    onSuccess: (data) => {
      toast.success(data.message || "Conta criada! Agora você pode fazer login.");
      router.push("/signin");
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao criar conta. Tente outro e-mail.");
    },
  });

  return {
    loginMutation,
    registerMutation,
  };
}
