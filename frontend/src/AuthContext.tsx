import { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";

type User = {
  id: number;
  name: string;
} | null;

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>(null);

  const fetchUser = async () => {
    try {
      const res = await api("me.php");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api("login.php", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      await fetchUser();
    }
  };

  const logout = async () => {
    await api("logout.php", { method: "POST" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
