import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import TogglePassword from "../../components/ui/TogglePassword";
import Input from "../../components/ui/Input";
import useRegister from "../../hooks/useRegister";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { register, loading, error } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await register({ name, username, password });
    if (user) {
      navigate("/tasks");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="flex flex-col w-[40%]" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold mb-4">Register</h1>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        >
          <TogglePassword
            show={showPassword}
            onClick={() => setShowPassword(!showPassword)}
          />
        </Input>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </button>
        <p className="mt-2">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
