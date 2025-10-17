import { useState } from "react";
import toast from "react-hot-toast";
import { loginService } from "../service/authService";

interface LoginData {
  username: string;
  password: string;
}

interface ErrorResponse {
  message: string;
  success?: boolean;
}

export default function useLogin() {
  const [loading, setLoading] = useState(false);

  const login = async (data: LoginData) => {
    setLoading(true);

    try {
      const res = await loginService(data);
      if (res.success) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        toast.success(res.message);
        return res.user;
      } else {
        toast.error(res.message);
        return null;
      }
    } catch (error: unknown) {
      let message = "Server Error";
      if (typeof error === "object" && error !== null && "message" in error) {
        message = (error as ErrorResponse).message;
      }
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
