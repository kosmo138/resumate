"use client"

import { useEffect, useState } from "react"
import HeadingText from "@/components/heading-text"
import LetterCard from "@/components/letter/lettercard"
import { LetterHead } from "@/types/letter"

export default function LetterSelector() {
  const mock_data = JSON.parse(`
  [
    {
      "id": 2,
      "title": "제목 2",
      "modified": 1712034759
    },
    {
      "id": 1,
      "title": "제목 1",
      "modified": 1712031565
    }
  ]
  `)
  const [letterHead, setLetterHead] = useState<LetterHead[]>()

  useEffect(() => {
    setLetterHead(mock_data)
  }, [])

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="수정할 자소서를 선택해 주세요">
        자기소개서
      </HeadingText>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(letterHead) &&
          letterHead.map((letter) => (
            <LetterCard key={letter.id} letterHead={letter} />
          ))}
        {!Array.isArray(letterHead) && (
          <div className="text-2xl font-bold">로딩 중입니다...</div>
        )}
      </div>
    </main>
  )
}
