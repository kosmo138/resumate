import HeadingText from "@/components/heading-text"
import ResumeCard from "@/components/resume/resumecard"
import { ResumeHead } from "@/types/resume"
import Link from "next/link"
import ResumeButton from "@/components/resume/resumebutton"

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
  ]
  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="수정할 이력서를 선택해 주세요">이력서</HeadingText>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resumeList.map((resumeHead, index) => (
          <div key={index}>
            <Link href={`/resume/${resumeHead.id}`} passHref>
              <ResumeCard
                key={index}
                title={resumeHead.title}
                updatedAt={resumeHead.updatedAt}
              />
            </Link>
            <div className="justify-endlg:grid-cols-3 mt-4 flex grid-cols-1">
              <Link href={`/letter`} passHref>
                <ResumeButton variant="outline">자기소개서 작성</ResumeButton>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
