import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/userApi";

export function useUsers() {
  const queryClient = useQueryClient();

  const users = useQuery({
    queryKey: ["users"],
    queryFn: api.getUsers,
  });

  const createUser = useMutation({
    mutationFn: api.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const deleteUser = useMutation({
    mutationFn: api.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { users, createUser, deleteUser };
}
