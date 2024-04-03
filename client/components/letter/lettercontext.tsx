"use client"

import { LetterBody, LetterHead } from "@/types/letter"
import { createContext, useContext, useState } from "react"

interface LetterContextType {
  letterHead: LetterHead[] | undefined
  letterBody: LetterBody | undefined
  setLetterHead: (head: LetterHead[]) => void
  setLetterBody: (body: LetterBody) => void
}

export const LetterContext = createContext<LetterContextType>({
  letterHead: [],
  letterBody: {},
  setLetterHead: () => {},
  setLetterBody: () => {},
})

export const LetterProvider = ({ children }: { children: React.ReactNode }) => {
  const [letterHead, setLetterHead] = useState<LetterHead[]>()
  const [letterBody, setLetterBody] = useState<LetterBody>()

  return (
    <LetterContext.Provider value={{ letterHead, letterBody, setLetterHead, setLetterBody }}>
      {children}
    </LetterContext.Provider>
  )
}

export const useLetter = (): LetterContextType => useContext(LetterContext)
