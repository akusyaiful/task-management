import api from "./api";

interface RegisterData {
  name: string;
  username: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}

export const registerService = (data: RegisterData) =>
  api.post("/auth/register", data).then((res) => res.data);

export const loginService = (data: LoginData) =>
  api.post("/auth/login", data).then((res) => res.data);
