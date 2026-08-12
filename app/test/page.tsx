"use client";

import { useAuth } from "@/context/AuthContext";

export default function TestAuthPage() {
  const { user, loading, register, login, logout } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleRegister = async () => {
    try {
      const user = await register("newuser@example.com", "123456");

      console.log("REGISTER:", user);
    } catch (error) {
      console.error("REGISTER ERROR:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await login("test@example.com", "123456");

      console.log("LOGIN:", user);
    } catch (error) {
      console.error("LOGIN ERROR:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();

      console.log("LOGOUT");
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    }
  };

  return (
    <main>
      <h1>Firebase Auth</h1>

      {user ? (
        <>
          <p>Авторизован: {user.email}</p>

          <p>UID: {user.uid}</p>

          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>Не авторизован</p>

          <button onClick={handleRegister}>Register</button>

          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </main>
  );
}
