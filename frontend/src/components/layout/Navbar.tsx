import { useEffect, useState } from "react";
import { logout } from "../../utils/logout";

export default function Navbar() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userLocal.name);
  }, []);

  return (
    <div className="flex justify-between items-center p-4 shadow">
      <h1 className="text-2xl font-bold">Task Management</h1>
      <div className="flex gap-4 items-center">
        <div className="text-xl font-bold">{user}</div>
        <button
          className="bg-red-500 font-semibold text-white px-3 py-2 rounded-lg hover:bg-red-500"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
