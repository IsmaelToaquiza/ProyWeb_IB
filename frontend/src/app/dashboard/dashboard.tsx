"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/services/authService";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState({ first_name: "", last_name: "" });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <div>
      <h2>Bienvenido al Dashboard</h2>
      <p>
        Hola, {user.first_name} {user.last_name}
      </p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;
