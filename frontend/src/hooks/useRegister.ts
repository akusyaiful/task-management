import { useState } from "react";
import toast from "react-hot-toast";
import { registerService } from "../service/authService";

interface RegisterData {
  name: string;
  username: string;
  password: string;
}

interface ErrorResponse {
  message: string;
  success?: boolean;
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
      if (typeof error === "object" && error !== null && "message" in error) {
        message = (error as ErrorResponse).message;
      }
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
}
