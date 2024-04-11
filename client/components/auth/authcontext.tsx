<<<<<<< HEAD
"use client"

import Cookies from "js-cookie"
import { createContext, useContext, useState, useEffect } from "react"

type email = string | null

interface AuthContextType {
  email: email
  login: (jwt: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  email: null,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<email>(null)

  const login = (jwt: string) => {
    const payload_str: string = jwt.split(".")[1]
    const decodedPayload: string = Buffer.from(payload_str, "base64").toString(
      "utf-8"
    )
    const payload_obj = JSON.parse(decodedPayload)
    setEmail(payload_obj.sub)
  }

  const logout = () => {
    setEmail(null)
    Cookies.remove("authorization", { path: "" })
  }

  useEffect(() => {
    const jwt = Cookies.get("authorization")
    if (jwt) {
      login(jwt)
    }
  }, [login])

  return (
    <AuthContext.Provider value={{ email, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => useContext(AuthContext)
=======
"use client";

import Cookies from "js-cookie";
import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  loggedin: boolean | null | undefined;
  login: (jwt: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  loggedin: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedin, setLoggedin] = useState<boolean>(false);

  const logout = () => {
    setLoggedin(false);
    Cookies.remove("authorization", { path: "" });
    window.location.href = "/";
  };

  const login = (jwt: string) => {
    const payload_str: string = jwt.split(".")[1];
    const decodedPayload: string = Buffer.from(payload_str, "base64").toString(
      "utf-8"
    );
    const payload_obj = JSON.parse(decodedPayload);
    if (payload_obj.exp > Date.now() / 1000) {
      setLoggedin(true);
    } else {
      logout();
    }
  };

  useEffect(() => {
    const jwt = Cookies.get("authorization");
    if (jwt) {
      login(jwt);
    }
  }, [login]);

  return (
    <AuthContext.Provider value={{ loggedin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
>>>>>>> origin/dev
