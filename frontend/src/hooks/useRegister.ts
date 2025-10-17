import { AxiosError } from "axios";
import { useState } from "react";
import { registerService } from "../service/authService";
import toast from "react-hot-toast";

interface RegisterData {
  name: string;
  username: string;
  password: string;
}

export default function useRegister() {
  const [loading, setLoading] = useState(false);

  const register = async (data: RegisterData) => {
    setLoading(true);

    try {
      const res = await registerService(data);
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

  return { register, loading };
}
