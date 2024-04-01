"use client"
import React, { useState, useEffect } from "react"
import HeadingText from "@/components/heading-text"
import ResumeAddButton from "@/components/resume/resumeaddbutton"
import ResumeCard from "@/components/resume/resumecard"
import { ResumeHead } from "@/types/resume"
import Link from "next/link"

export default function ResumeSelector() {
  const [resumeList, setResumeList] = useState<ResumeHead[]>([])

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
          resume.updatedAt = convertDateFormat(resume.updatedAt)
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
