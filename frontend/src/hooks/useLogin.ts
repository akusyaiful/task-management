import { useState } from "react";
import { loginService } from "../service/authService";
import { AxiosError } from "axios";

interface LoginData {
  username: string;
  password: string;
}

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await loginService(data);
      if (res.success) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        return res.user;
      } else {
        setError(res.message);
        return null;
      }
    } catch (error: unknown) {
      let message = "Server Error";

      if (error instanceof AxiosError) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
