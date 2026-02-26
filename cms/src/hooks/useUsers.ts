import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getUsers, softDeleteUser } from "../api/userApi"

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await getUsers()
      return res.data.filter(user => !user.isDeleted)
    }
  })
}

export const useSoftDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => softDeleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    }
  })
}