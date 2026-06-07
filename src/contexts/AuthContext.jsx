import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/config";
import { logout as logoutService } from "../services/auth/authService";
import { getUserById } from "../services/users/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setLoadingAuth(true);

        if (currentUser) {
          const userProfile = await getUserById(currentUser.uid);

          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            ...userProfile,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Erro ao carregar usuário autenticado:", error);
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingAuth,
        isAuthenticated: !!user,
        role: user?.role || null,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}