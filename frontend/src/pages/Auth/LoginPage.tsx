import { useState } from "react";
import { Link } from "react-router";
import TogglePassword from "../../components/ui/TogglePassword";
import Input from "../../components/ui/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="flex flex-col w-[40%]">
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        >
          Login
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
