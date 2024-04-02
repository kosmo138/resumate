"use client"
import { baseUrl } from "@/config/metadata"
import { ResumeBody } from "@/types/resume"
import { notFound } from "next/navigation"
import HeadingText from "@/components/heading-text"
import SaveButton from "@/components/resume/button"

export default async function ResumeEditor() {
  /* GET 요청에 대한 응답이 없으면 404 오류 페이지를 표시합니다 */
  /*const response = await fetch(`${baseUrl}/api/resume/${id}`)
    .then((res) => res.json())
    .catch(() => notFound());
  const resumeBody: ResumeBody = response.parse();
  */
}
