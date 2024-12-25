import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token); // State for isLoggedIn
  const [user, setUser] = useState("");

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken); // Update the token state immediately
  };

  const LogoutUser = () => {
    setToken(""); // Clear the token state
    localStorage.removeItem("token"); // Remove the token from LS
  };

  // Update isLoggedIn whenever the token changes
  useEffect(() => {
    setIsLoggedIn(!!token);
    userAuthentication();
  }, [token]);

  // Get current logged in user data

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:2213/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        console.log(data.userData);
      }
    } catch (e) {
      console.log("error at fetching ", e);
    }
  };


  return (
    <AuthContext.Provider
      value={{ storeTokenInLS, LogoutUser, isLoggedIn, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
