import { ResumeBody } from "@/types/resume"

export default function ResumeForm({ resume }: { resume: ResumeBody }) {
  return (
    <>
      <ul>
        <li>제목: {resume.title}</li>
        <li>수정일: {resume.updatedAt}</li>
      </ul>
    </>
  )
}
