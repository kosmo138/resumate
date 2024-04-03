"use client"
import { useState, useEffect } from "react"
import { ResumeHead } from "@/types/resume"
import ResumeCard from "./resumecard"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import Cookies from "js-cookie"

export default function ResumeAddButton({ addButton }: { addButton?: string }) {
  const [resumeList, setResumeList] = useState<ResumeHead[]>([])

  //페이지 로드 시 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const storedResumeList = localStorage.getItem("resumeList")
    if (storedResumeList) {
      setResumeList(JSON.parse(storedResumeList))
    }
  }, [])

  // 데이터 변경 시 로컬 스토리지에 저장하기
  useEffect(() => {
    localStorage.setItem("resumeList", JSON.stringify(resumeList))
  }, [resumeList])

  const handleButtonClick = () => {
    {
      const newResumeList = [
        ...resumeList,
        {
          id: resumeList.length + 1,
          title: `새로운 이력서 ${resumeList.length + 1}`,
          modified: new Date().toISOString().split("T")[0],
        },
      ]
      setResumeList(newResumeList)
    }
    const Resumedata = {
      title: "제목을 입력해주세요",
      careerData: [{ date: "", content: "" }],
      careerText: "",
      education: [{ date: "", content: "" }],
      skill: "",
      award: [{ date: "", content: "" }],
      language: "",
    }

    fetch(`/api/resume`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("authorization")}`,
      },
      body: JSON.stringify(Resumedata),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        //fetchGet()
      })
      // 새 이력서의 ID를 가져옵니다.
      .catch((error) => {
        console.log("POST 에러:", error)
      })
  }
  return (
    <>
      {/* TODO: POST 요청 보내고 GET 요청 해서 가져온 데이터를 page.tsx의 resumeList 상태에 반영하는 함수 */}
      <Card>
        <CardContent>
          <div className="mb-10 mt-8 text-center text-lg font-bold">
            <button onClick={handleButtonClick}>
              <Image src="/add.svg" width={120} height={120} alt="add" />
            </button>
            <h3>새로 만들기</h3>
          </div>
        </CardContent>
      </Card>
      {/* 새로운 resumecard들을 렌더링 */}
      {resumeList.map((resumeHead, index) => (
        <Link href={`/resume/${resumeHead.id}`} key={index}>
          <ResumeCard
            key={index}
            title={resumeHead.title}
            modified={resumeHead.modified}
          />
        </Link>
      ))}
    </>
  )
}
