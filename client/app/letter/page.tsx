"use client"

import HeadingText from "@/components/heading-text"
import LetterCard from "@/components/letter/lettercard"
import { LetterHead } from "@/types/letter"
import Cookies from "js-cookie"
import { useState, useEffect } from "react"

export default function LetterSelector() {
  const [letterList, setLetterList] = useState<Array<LetterHead>>([])

  useEffect(() => {
    const fetchLetterList = () => {
      fetch("/api/letter", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("authorization")}`,
          },
        })
        .then((response) => response.json())
        .then((data) => {
          setLetterList(data)
        })
        .catch((error) => console.error(error))
    }

    fetchLetterList()
  }, [])

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="수정할 자소서를 선택해 주세요">자기소개서</HeadingText>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {letterList.map((letter) => (
          <LetterCard key={letter.id} letterHead={letter} />
        ))}
      </div>
    </main>
  )
}
