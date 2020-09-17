import React, { useEffect, useState } from "react";
import app from "./config";

export const AuthContext = React.createContext({ user: null });

const useAuth = () => {
  const [state, setState] = useState(() => {
    const user = app.auth().currentUser;
    return { initializing: !user, user };
  });

  function onChange(user) {
    setState({ initializing: false, user });
  }

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged(onChange);
    return () => unsubscribe();
  }, []);

  return state;
};

export const AuthProvider = ({ children }) => {
  const { initializing, user } = useAuth();
  if (initializing) return null;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
