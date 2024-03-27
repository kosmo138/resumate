import HeadingText from "@/components/heading-text"
import ResumeAddButton from "@/components/resume/resumeaddbutton"
import ResumeCard from "@/components/resume/resumecard"
import React from "react"
import { ResumeHead } from "@/types/resume"
import Link from "next/link"

// 이력서 편집 페이지에서 저장할 시에 이력서 목록페이지 가져오기.
export default function ResumeSelector() {
  /* GET 요청에 대한 응답이 없으면 404 오류 페이지를 표시합니다 */
  /*const response = await fetch(`${baseUrl}/api/resume/${id}`)
    .then((res) => res.json())
    .catch(() => notFound());
  const resumeBody: ResumeBody = response.parse();
  */
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
  ]

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="수정할 이력서를 선택해 주세요">이력서</HeadingText>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resumeList.map((resumeHead, index) => (
          <div key={index}>
            {/* <Link href={`/resume/${resumeHead.id}`} passHref> */}
            <ResumeCard
              key={index}
              title={resumeHead.title}
              updatedAt={resumeHead.updatedAt}
            />
          </div>
        ))}
        <ResumeAddButton />
      </div>
    </main>
  )
}
