"use client"
import { useState } from "react"
import { ResumeHead } from "@/types/resume"
import ResumeCard from "./resumecard"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function ResumeAddButton({ addButton }: { addButton?: string }) {
  const [resumeList, setResumeList] = useState<ResumeHead[]>([])

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
          <div className="md-1 mt-10 text-center text-lg font-bold">
            <button onClick={handleClick}>
              <img src="/add.svg" alt="add"></img>
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
