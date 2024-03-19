import HeadingText from "@/components/heading-text"
import ResumeCard from "@/components/resume/resumecard"
import { ResumeHead } from "@/types/resume"
import Link from "next/link"

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
      title: "세 번째 이력서",
      updatedAt: "2024-03-03",
    },
    {
      id: 4,
      title: "네 번째 이력서",
      updatedAt: "2024-03-04",
    },
  ]
  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="수정할 이력서를 선택해 주세요">이력서</HeadingText>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resumeList.map((resumeHead, index) => (
          <Link href={`/resume/${resumeHead.id}`} passHref>
            <ResumeCard
              key={index}
              title={resumeHead.title}
              updatedAt={resumeHead.updatedAt}
            />
          </Link>
        ))}
      </div>
    </main>
  )
}
