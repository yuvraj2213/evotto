import { createContext, useContext, useState, useEffect } from "react";
const baseURL = process.env.REACT_APP_BASE_URL || "https://evotto-backend-yol8.onrender.com";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [user, setUser] = useState("");

  const [isLoading,setIsLoading]=useState(true)

  const authorizationToken=`Bearer ${token}`

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
    if (token) {
      userAuthentication();
    } else {
      setUser(null);
    }
  }, [token]);

  // Get current logged in user data

  const userAuthentication = async () => {
    if (!token) {
      console.log("No token found. User not authenticated.");
      return; // Don't attempt to fetch if no token is available
    }
    try {
      setIsLoading(true)
      const response = await fetch(`${baseURL}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        console.log(data.userData);
        setIsLoading(false)
      }
      setIsLoading(false)
    } catch (e) {
      console.log("error at fetching ", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ storeTokenInLS, LogoutUser, isLoggedIn, user , authorizationToken, isLoading}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
