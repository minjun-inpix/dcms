import axios from "axios"
import type { User } from "../types/user"

const api = axios.create({
    baseURL: "http://localhost:4000"
})

export const getUsers = () => {
    return api.get<User[]>("/users")
}

export const softDeleteUser = (id: number) => {
  return api.patch(`/users/${id}`, {
    isDeleted: true
  })
}