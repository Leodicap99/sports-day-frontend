import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === undefined
      ? false
      : Boolean(sessionStorage.getItem("isLoggedIn"))
  );
  const [darkMode, setDarkMode] = useState(false);
  const setLogin = (info) => {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
      sessionStorage.setItem("isLoggedIn", JSON.stringify(info));
    } else {
      setIsLoggedIn(false);
      sessionStorage.removeItem("isLoggedIn");
    }
  };
  const toggleMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, setLogin,darkMode,toggleMode }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
