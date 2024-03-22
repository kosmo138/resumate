"use client"
import { baseUrl } from "@/config/metadata"
import { ResumeBody } from "@/types/resume"
import { notFound } from "next/navigation"
import HeadingText from "@/components/heading-text"
import SaveButton from "@/components/resume/button"

export default async function ResumeEditor(id: string) {
  /* GET 요청에 대한 응답이 없으면 404 오류 페이지를 표시합니다 */
  /*const response = await fetch(`${baseUrl}/api/resume/${id}`)
    .then((res) => res.json())
    .catch(() => notFound());
  const resumeBody: ResumeBody = response.parse();
  */
  // return (
  //   <main className="container flex flex-col items-center py-8">
  //     <HeadingText subtext="자기소개서 생성에 필요한 최소의 정보를 입력해 주세요.">
  //       이력서
  //     </HeadingText>
  //     {/*     <ResumeForm resume={resumeBody} /> */}
  //     <div
  //       data-orientation="horizontal"
  //       role="none"
  //       className="h-[1px] w-full shrink-0 bg-border"
  //     ></div>
  //     <ResumeInputForm title="제목" content="제목을 입력해주세요." />
  //     <DoubleForm
  //       title="경력"
  //       contentdate="기간"
  //       period="YYYY-MM-DD ~ YYYY-MM-DD"
  //       contents="본인의 업무 경험을 기반으로 핵심역량과 업무 스킬을 간단히 작성해주세요."
  //       count={3}
  //     />
  //     <ResumeTextarea content="담당하신 업무 중 우선순위가 높은 업무 어쩌구" />
  //     <DoubleForm
  //       title="학력"
  //       contentdate="기간"
  //       period="YYYY-MM-DD ~ YYYY-MM-DD"
  //       contents="출신 학교를 입력해 주세요."
  //       count={2}
  //     />
  //     <ResumeInputWideForm title="스킬" content="개발 스택, 디자인 툴 어쩌구" />
  //     <DoubleForm
  //       title="수상 및 기타"
  //       contentdate="수상날짜"
  //       period="YYYY-MM"
  //       contents="활동명"
  //       count={2}
  //     />
  //     <ResumeInputWideForm
  //       title="외국어"
  //       content="외국어 자격증을 보유한 경우"
  //     />
  //     <SaveButton />
  //   </main>
  // )
}
