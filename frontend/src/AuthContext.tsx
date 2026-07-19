import { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";
import { toast } from "sonner";

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
      await fetchUser(); // 🔥 これが最重要
    }

    return res; // ←これ追加
  };

  const logout = async () => {
    await api("logout.php", { method: "POST" });
    await fetchUser(); // セッション確認で確実にnull
  };

  const handleLogout = async () => {
    await logout();
    toast.success("ログアウトしました");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, handleLogout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
