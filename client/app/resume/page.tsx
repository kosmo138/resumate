"use client"
import React, { useState, useEffect } from "react"
import HeadingText from "@/components/heading-text"
import ResumeAddButton from "@/components/resume/resumeaddbutton"
import ResumeCard from "@/components/resume/resumecard"
import { ResumeHead } from "@/types/resume"
import Cookies from "js-cookie"

export default function ResumeSelector(id: string) {
  const [resumeList, setResumeList] = useState<Array<ResumeHead>>([])

  useEffect(() => {
    const fetchResumeList = async () => {
      try {
        const response = await fetch("/api/resume", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("authorization")}`,
          },
        })
        const data = await response.json()
        setResumeList(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchResumeList()
  }, [])

  const apiUrl = `http://localhost/api/resume/${id}`
  const jwt = Cookies.get("authorization")

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="수정할 이력서를 선택해 주세요">이력서</HeadingText>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ResumeAddButton />
        {resumeList.map((resumeHead, index) => (
          <div key={index}>
            <ResumeCard
              key={index}
              id={resumeHead.id}
              title={resumeHead.title}
              modified={resumeHead.modified}
            />
          </div>
        ))}
      </div>
    </main>
  )
}

/* 
fetch(apiUrl, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch resume data")
    }
    return response.json()
  })
  .then((resumeData) => {
    const initialData = {
      title: resumeData.title,
      careerData: resumeData.careerData,
      careerText: resumeData.careerText,
      education: resumeData.education, // education이 없을 경우 빈 배열로 초기화
      skill: resumeData.skill, // skill이 없을 경우 빈 문자열로 초기화
      award: resumeData.award, // award가 없을 경우 빈 배열로 초기화
      language: resumeData.language, // language가 없을 경우 빈 문자열로 초기화
    }
    console.log(resumeData)
  })
  .catch((error) => {
    console.error("Error:", error)
  })
useEffect(() => {
  const fetchResumeList = async (token: string): Promise<ResumeHead[]> => {
    try {
      const url = "http://localhost/api/resume/"
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const resumeList: ResumeHead[] = await response.json()
      resumeList.forEach((resume) => {
        resume.modified = convertDateFormat(resume.modified)
      })
      return resumeList
    } catch (error) {
      console.error("Error fetching resume list:", error)
      return []
    }
  }
  const exampleToken: string = "your_token_here"
  fetchResumeList(exampleToken)
    .then((fetchedResumeList) => {
      setResumeList(fetchedResumeList)
    })
    .catch((error) => {
      console.error("Error fetching resume list:", error)
    })
}, [])
const convertDateFormat = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-CA")
}
*/
