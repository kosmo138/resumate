import { useRouter } from "next/router"
import React from "react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ResumeHead } from "@/types/resume"

interface Props {
  resumeHeads: ResumeHead[]
}

export default function ChangeResume({ resumeHeads }: Props) {
  const router = useRouter()

  const handleResumeClick = (id: number) => {
    router.push(`/resume/${id}`)
  }

  return (
    <div>
      {resumeHeads.map((resumeHead) => (
        <DropdownMenuItem
          key={resumeHead.id}
          onClick={() => handleResumeClick(resumeHead.id)}
        >
          {resumeHead.title} {/* 이력서 제목 또는 다른 정보 표시 */}
        </DropdownMenuItem>
      ))}
    </div>
  )
}
