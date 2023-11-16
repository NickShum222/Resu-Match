import React from "react";
import { useEffect, useState, createContext, useContext } from "react";
import { auth } from "./firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signOut = () => {
    auth.signOut();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
