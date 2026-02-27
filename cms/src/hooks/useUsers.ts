import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getUsers, softDeleteUser, createUser, updateUser } from "../api/userApi"


export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      console.log("API 호출 직전");
      const res = await getUsers()
      console.log("API 호출 완료");
      // 소프트 삭제된 유저도 화면에 남겨두기 위해 필터링하지 않는다
      return res.data
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

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    }
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    }
  })
}

