import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success("Sign Up successful");
    },
    onError: () => toast.error("Coudln't sign up!"),
  });

  return { signUp, isLoading };
}
