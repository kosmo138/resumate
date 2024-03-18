import { baseUrl } from "@/config/metadata"
import { ResumeBody } from "@/types/resume"
import { notFound } from "next/navigation"
import ResumeForm from "@/components/resume/resumeform"

export default async function ResumeEditor(id: string) {
  const resumeId = parseInt(id)
  const response = await fetch(`${baseUrl}/api/resume/${resumeId}`)
    .then((res) => res.json())
    .catch(() => notFound())
  const resumeBody: ResumeBody = await response.json()
  return (
    <main>
      <ResumeForm resume={resumeBody} />
    </main>
  )
}
