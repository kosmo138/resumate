import HeadingText from "@/components/heading-text"
import ResumeAddButton from "@/components/resume/resumeaddbutton"
import ResumeCard from "@/components/resume/resumecard"
import React from "react"
import { ResumeHead } from "@/types/resume"
import Link from "next/link"

// 이력서 편집 페이지에서 저장할 시에 이력서 목록페이지 가져오기.
export default function ResumeSelector() {
  const resumeList: Array<ResumeHead> = [
    {
      id: 1,
      title: "첫 번째 이력서",
      updatedAt: "2024-03-01",
    },
    {
      id: 2,
      title: "두 번째 이력서",
      updatedAt: "2024-03-02",
    },
    {
      id: 3,
      title: "세 번째 이력서 제목이 길면 어떻게 되는지 알고 싶은데",
      updatedAt: "2024-03-03",
    },
    {
      id: 4,
      title: "네 번째 이력서",
      updatedAt: "2024-03-04",
    },
    {
      id: 5,
      title: "다섯 번째 이력서",
      updatedAt: "2024-03-05",
    },
    {
      id: 6,
      title: "여섯 번째 이력서",
      updatedAt: "2024-03-06",
    },
  ]

  return (
    <main>
      <div className="ml-10 flex grid-cols-3 font-bold">
        <HeadingText subtext="수정할 이력서를 선택해 주세요">
          이력서
        </HeadingText>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4 p-8 sm:grid-cols-3 lg:grid-cols-3">
        {resumeList.map((resumeHead, index) => (
          <div key={index}>
            <Link href={`/resume/${resumeHead.id}`} passHref>
              <ResumeCard
                key={index}
                title={resumeHead.title}
                updatedAt={resumeHead.updatedAt}
              />
            </Link>
          </div>
        ))}
        <ResumeAddButton />
      </div>
    </main>
  )
}
