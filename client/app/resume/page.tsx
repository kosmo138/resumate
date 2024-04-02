"use client"
import React, { useState, useEffect } from "react"
import HeadingText from "@/components/heading-text"
import ResumeAddButton from "@/components/resume/resumeaddbutton"
import ResumeCard from "@/components/resume/resumecard"
import { ResumeHead } from "@/types/resume"
import Cookies from "js-cookie"
import UnauthorizedDialog from "@/components/auth/unauthorized-dialog"

export default function ResumeSelector(id: string) {
  const [resumeList, setResumeList] = useState<Array<ResumeHead>>([])
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const fetchResumeList = () => {
      fetch("/api/resume", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("authorization")}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else {
            setIsError(true)
          }
        })
        .then((data) => {
          setResumeList(data)
        })
    }

    fetchResumeList()
  }, [])

  const apiUrl = `http://localhost/api/resume/${id}`
  const jwt = Cookies.get("authorization")

  // UNIX 타임스탬프를 YYYY-MM-DD 형식으로 변환하는 함수
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000) // UNIX 타임스탬프(ms)를 받습니다.
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="수정할 이력서를 선택해 주세요">이력서</HeadingText>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ResumeAddButton />
        {isError && <UnauthorizedDialog />}
        {!isError &&
          resumeList.map((resumeHead, index) => (
            <ResumeCard
              key={index}
              id={resumeHead.id}
              title={resumeHead.title}
              modified={
                typeof resumeHead.modified === "number"
                  ? formatDate(resumeHead.modified)
                  : resumeHead.modified
              } // 수정된 날짜를 포맷팅하여 전달합니다.
            />
          ))}
      </div>
    </main>
  )
}
