import { ResumeBody } from "@/types/resume"

export default function ResumeForm({ resume }: { resume: ResumeBody }) {
  return (
    <>
      <ul>
        <li>제목: {resume.title}</li>
        <li>기술: {resume.skill}</li>
        <li>외국어: {resume.language}</li>
      </ul>
    </>
  )
}
