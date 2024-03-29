import HeadingText from "@/components/heading-text"
import ResumeAddButton from "@/components/resume/resumeaddbutton"
import ResumeCard from "@/components/resume/resumecard"
import React from "react"
import { ResumeHead } from "@/types/resume"
import Link from "next/link"

// 이력서 편집 페이지에서 저장할 시에 이력서 목록페이지 가져오기.
export default function ResumeSelector() {
  /* GET 요청에 대한 응답이 없으면 404 오류 페이지를 표시합니다 */
  /*const response = await fetch(`${baseUrl}/api/resume/${id}`)
    .then((res) => res.json())
    .catch(() => notFound());
  const resumeBody: ResumeBody = response.parse();
  */
  interface ResumeHead {
    id: number
    title: string
    updatedAt: string
  }

  // 이력서 목록을 가져오는 함수
  const fetchResumeList = async (token: string): Promise<ResumeHead[]> => {
    try {
      const url = "http://localhost/api/resume/"

      // Fetch 또는 Axios를 사용하여 GET 요청을 보냅니다.
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함시킵니다.
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const resumeList: ResumeHead[] = await response.json() // JSON 형식의 응답을 파싱합니다.

      // modified 값을 YYYY-MM-DD 형식으로 변환합니다.
      resumeList.forEach((resume) => {
        resume.updatedAt = convertDateFormat(resume.updatedAt)
      })

      return resumeList // 이력서 목록 반환
    } catch (error) {
      console.error("이력서 목록을 가져오는데 실패했습니다:", error)
      return [] // 실패할 경우 빈 배열 반환
    }
  }

  // modified 값을 YYYY-MM-DD 형식으로 변환하는 함수
  const convertDateFormat = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-CA")
  }

  // 예시 토큰
  const exampleToken: string = "your_token_here"

  // 이력서 목록을 가져와서 출력하는 예시
  fetchResumeList(exampleToken).then((resumeList) => {
    console.log("이력서 목록:", resumeList)
  })
  const resumeList: Array<ResumeHead> = [
    // http://localhost/api/resume/
    // Fetch나 엑시오스 Get 요청
    // 고려해봐야되는게 token 관리
    // modified 값(타임스탬프)를 YYYY-MM-DD 형식으로 변환 함수 추가

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
    {
      id: 3,
      title: "세 번째 이력서 제목이 길면 어떻게 되는지 알고 싶은데",
      updatedAt: "2024-03-03",
    },
  ]

  // 삭제버튼에 이벤트핸들러 추가

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="수정할 이력서를 선택해 주세요">이력서</HeadingText>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ResumeAddButton />
        {resumeList.map((resumeHead, index) => (
          <div key={index}>
            <Link href={`/resume/${resumeHead.id}`} passHref>
              <ResumeCard
                key={index}
                title={resumeHead.title}
                updatedAt={resumeHead.updatedAt}
              />
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}
