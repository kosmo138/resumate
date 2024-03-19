import { baseUrl } from "@/config/metadata"
import { ResumeBody } from "@/types/resume"
import { notFound } from "next/navigation"
import HeadingText from "@/components/heading-text"
import ResumeForm from "@/components/resume/resumeform"

export default async function ResumeEditor(id: string) {
  /* GET 요청에 대한 응답이 없으면 404 오류 페이지를 표시합니다 */
  const response = await fetch(`${baseUrl}/api/resume/${id}`)
    .then((res) => res.json())
    .catch(() => notFound())
  const resumeBody: ResumeBody = response.parse()
  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="이력서 생성에 필요한 최소의 정보를 입력해 주세요">
        이력서 수정
      </HeadingText>
      <ResumeForm resume={resumeBody} />
    </main>
  )
}
