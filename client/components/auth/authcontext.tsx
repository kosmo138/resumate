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
    console.log("[Debug] jwt: ", jwt)
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