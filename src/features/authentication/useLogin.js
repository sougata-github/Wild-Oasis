import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../../services/apiAuth";

import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user); //manually set data in the react-query cache.
      navigate("/dashboard", { replace: true });
    },
    onError: () => toast.error("Incorrect credentials!"),
  });

  return { login, isLoading };
}
