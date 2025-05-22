import React, { useContext, useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const userContext = createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useState(() => Cookies.get("token"));
  const [userInfo, setUserInfo] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    const userToken = Cookies.get("token");
    if (userToken) {
      setToken(userToken);
      try {
        const decoded = jwtDecode(userToken);
        setUserInfo(decoded);
        setIsConnected(true);
      } catch (err) {
        console.error("Token invalide :", err);
        setIsConnected(false);
      }
    } else {
      setIsConnected(false);
    }
  };

  const tokenSetter = (new_token) => {
    Cookies.set("token", new_token);
    setToken(new_token);
    try {
      const decoded = jwtDecode(new_token);
      setUserInfo(decoded);
      setIsConnected(true);
    } catch (err) {
      console.error("Token invalide :", err);
    }
  };

  const verifyToken = () => {
    return !!token;
  };

  const tokenDisconnect = () => {
    Cookies.remove("token");
    setToken(null);
    setUserInfo(null);
    setIsConnected(false);
    navigate("/sign-in");
  };

  const data = {
    token,
    userId: userInfo?.id,
    username: userInfo?.username,
    userInfo,
    tokenSetter,
    tokenDisconnect,
    verifyToken,
    checkToken,
    isConnected,
  };

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
}

export const useUserContext = () => useContext(userContext);
