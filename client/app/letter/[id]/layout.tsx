import HeadingText from "@/components/heading-text"
import React from "react"
import Link from "next/link"

export default function ResumeLayout() {
  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="자기소개서 생성에 필요한 최소의 정보를 입력해 주세요">
        이력서 수정
      </HeadingText>
    </main>
  )
}
