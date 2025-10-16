import { AxiosError } from "axios";
import { useState } from "react";
import { registerService } from "../service/authService";

interface RegisterData {
  name: string;
  username: string;
  password: string;
}

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await registerService(data);
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

  return { register, loading, error };
}
