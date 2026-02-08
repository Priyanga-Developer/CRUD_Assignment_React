import axios from "axios";
import type { CreateUserInput } from "../types/users";

const api = axios.create({
  baseURL: "http://localhost:3001"
});

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const createUser = async (data:CreateUserInput) => {
  const res = await api.post("/users", data);
  return res.data;
};

export const deleteUser = async (id:number) => {
  await api.delete(`/users/${id}`);
};
