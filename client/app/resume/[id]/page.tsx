"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { ResumeBody } from "@/types/resume"
import HeadingText from "@/components/heading-text"
import ResumeForm from "@/components/resume/resumeform"

export default function ResumeEditor({ params }: { params: { id: string } }) {
  const [resumeBody, setResumeBody] = useState<ResumeBody>({})

  useEffect(() => {
    const fetchResume = () => {
      fetch(`/api/resume/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("authorization")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setResumeBody(data)
        })
        .catch((error) => console.error(error))
    }

    fetchResume()
  }, [params.id])

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="자소서 생성에 필요한 최소의 정보를 입력해 주세요">
        이력서 수정
      </HeadingText>
      <ResumeForm resume={resumeBody} />
    </main>
  )
}
