import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import TogglePassword from "../../components/ui/TogglePassword";
import Input from "../../components/ui/Input";
import useLogin from "../../hooks/useLogin";
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await login({ username, password });
    if (user) {
      navigate("/tasks");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Toaster position="top-center" reverseOrder={false} />

      <form
        className="flex flex-col w-[70%] sm:w-[40%]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <TogglePassword
            show={showPassword}
            onClick={() => setShowPassword(!showPassword)}
          />
        </Input>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <p className="mt-2">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
