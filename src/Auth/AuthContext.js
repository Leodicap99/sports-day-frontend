import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === undefined
      ? false
      : Boolean(sessionStorage.getItem("isLoggedIn"))
  );
  const setLogin = (info) => {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
      sessionStorage.setItem("isLoggedIn", JSON.stringify(info));
    } else {
      setIsLoggedIn(false);
      sessionStorage.removeItem("isLoggedIn");
    }
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
