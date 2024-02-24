import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User updated successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => toast.error("User could not be updated!"),
  });

  return { updateUser, isUpdating };
}
