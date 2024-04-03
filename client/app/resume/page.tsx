"use client"

import HeadingText from "@/components/heading-text"
import ResumeCard from "@/components/resume/resumecard"
import { ResumeHead } from "@/types/resume"
import Cookies from "js-cookie"
import { useState, useEffect } from "react"

export default function ResumeSelector() {
  const [resumeList, setResumeList] = useState<Array<ResumeHead>>([])

  useEffect(() => {
    const fetchResumeList = () => {
      fetch("/api/resume", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("authorization")}`,
          },
        })
        .then((response) => response.json())
        .then((data) => {
          setResumeList(data)
        })
        .catch((error) => console.error(error))
    }

    fetchResumeList()
  }, [])

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="수정할 이력서를 선택해 주세요">이력서</HeadingText>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resumeList.map((resume) => (
          <ResumeCard key={resume.id} resumeHead={resume} />
        ))}
      </div>
    </main>
  )
}
