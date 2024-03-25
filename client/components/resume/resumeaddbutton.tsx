"use client"
import { useState, useEffect } from "react"
import { ResumeHead } from "@/types/resume"
import ResumeCard from "./resumecard"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function ResumeAddButton({ addButton }: { addButton?: string }) {
  const [resumeList, setResumeList] = useState<ResumeHead[]>([])

  // 페이지 로드 시 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const storedResumeList = localStorage.getItem("resumeList")
    if (storedResumeList) {
      setResumeList(JSON.parse(storedResumeList))
    }
  }, [])

  // 데이터 변경 시 로컬 스토리지에 저장하기
  useEffect(() => {
    localStorage.setItem("resumeList", JSON.stringify(resumeList))
  }, [resumeList])

  const handleClick = () => {
    const newResumeList = [
      ...resumeList,
      {
        id: resumeList.length + 1,
        title: `새로운 이력서 ${resumeList.length + 1}`,
        updatedAt: new Date().toISOString(),
      },
    ]
    setResumeList(newResumeList)
  }

  return (
    <>
      <Card>
        <CardContent>
          <div className="mb-8 mt-8 text-center text-lg font-bold">
            <button onClick={handleClick}>
              <img src="/add.svg" alt="add" />
            </button>
            <h3>새로 만들기</h3>
          </div>
        </CardContent>
      </Card>
      {/* 새로운 resumecard들을 렌더링 */}
      {resumeList.map((resumeHead, index) => (
        <Link href={`/resume/${resumeHead.id}`} key={index}>
          <ResumeCard
            key={index}
            title={resumeHead.title}
            updatedAt={resumeHead.updatedAt}
          />
        </Link>
      ))}
    </>
  )
}
