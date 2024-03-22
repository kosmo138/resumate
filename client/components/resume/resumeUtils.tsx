"use client"
import { useState } from "react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ResumeHead } from "@/types/resume"

export default function ResumeCopyCard({
  title,
  updatedAt,
}: {
  title?: string
  updatedAt?: string
}) {
  const [resumeList, setResumeList] = useState<ResumeHead[]>([
    // 기존 이력서 리스트 데이터
  ])

  const handleCloneResume = () => {
    // 현재 클릭한 이력서의 정보를 가져와서 새로운 이력서 생성
    const clickedResume = {
      id: resumeList.length + 1,
      title: `복제된 이력서 - ${title}`,
      updatedAt: new Date().toISOString(),
    }

    // 이력서 리스트에 새로운 이력서 추가
    setResumeList([...resumeList, clickedResume])
  }
  return handleCloneResume
}
