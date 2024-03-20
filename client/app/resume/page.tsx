import HeadingText from "@/components/heading-text"
import ResumeAddButton from "@/components/resume/resumeaddbutton"
import ResumeCard from "@/components/resume/resumecard"
import { ResumeHead } from "@/types/resume"
import Link from "next/link"

// 이력서 편집 페이지에서 저장할 시에 이력서 목록페이지 가져오기.
export default function ResumeSelector() {
  const resumeList: Array<ResumeHead> = []

  return (
    <main className="container flex flex-col items-start py-8">
      <HeadingText subtext="수정할 이력서를 선택해 주세요">이력서</HeadingText>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resumeList.map((resumeHead, index) => (
          <div key={index}>
            {/* <Link href={`/resume/${resumeHead.id}`} passHref> */}
            <ResumeCard
              key={index}
              title={resumeHead.title}
              updatedAt={resumeHead.updatedAt}
            />
            {/* </Link> */}
          </div>
        ))}
        <ResumeAddButton />
      </div>
    </main>
  )
}
