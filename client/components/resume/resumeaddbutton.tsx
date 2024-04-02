"use client"
import { useState, useEffect } from "react"
import { ResumeHead } from "@/types/resume"
import ResumeCard from "./resumecard"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

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
        modified: new Date().toISOString().split("T")[0],
        // . split("T")[0], 문자열을 특정 구분자를 기준으로 나누고, 그결과를 배열로 반환하는 javascript의 문자열 메서드인 split()을 사용하는 것
        // 여기서 "T"는 구분자로 사용되며, 문자열을 "T"를 기준으로 분할 합니다.
        // 그리고 '[0]'은 분할된 결과 배열에서 첫 번째 요소를 선택하는 것을 의미합니다.
      },
    ]

    setResumeList(newResumeList)
    console.log("새이력서 추가")
  }

  return (
    <>
      <Card>
        <CardContent>
          <div className="mb-10 mt-8 text-center text-lg font-bold">
            <button onClick={handleClick}>
              <Image src="/add.svg" width={120} height={120} alt="add" />
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
            modified={resumeHead.modified}
          />
        </Link>
      ))}
    </>
  )
}
