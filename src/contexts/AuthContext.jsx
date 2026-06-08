import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/config";
import { logout as logoutService } from "../services/auth/authService";
import { getUserById } from "../services/users/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setLoadingAuth(true);

        if (!currentUser) {
          setAuthUser(null);
          setUserData(null);
          return;
        }

        const profile = await getUserById(currentUser.uid);

        setAuthUser({
          uid: currentUser.uid,
          email: currentUser.email,
          emailVerified: currentUser.emailVerified,
        });

        setUserData(profile);
      } catch (error) {
        console.error("Erro ao carregar usuário autenticado:", error);
        setAuthUser(null);
        setUserData(null);
      } finally {
        setLoadingAuth(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await logoutService();
    setAuthUser(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        userData,
        loadingAuth,
        isAuthenticated: !!authUser,
        role: userData?.role || null,
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