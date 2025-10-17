import { useState } from "react";
import { loginService } from "../service/authService";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface LoginData {
  username: string;
  password: string;
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

      if (error instanceof AxiosError) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
