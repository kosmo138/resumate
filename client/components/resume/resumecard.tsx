"use client"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import ResumeButton from "./resumebutton"
import Image from "next/image"
import React from "react"
import ResumePage from "./resumedownload"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ResumeCard({
  title,
  updatedAt,
}: {
  title?: string
  updatedAt?: string
}) {
  // // 클릭 이벤트 처리 함수
  // const handleClick = () => {
  //   // 클릭 시 할 일을 여기에 작성
  //   alert("버튼이 클릭되었습니다.")
  // }

  // // DropdownMenuItem를 클릭했을 때 호출되는 함수입니다.
  const changeClick = () => {
    window.location.href = "`/resume/${resumeHead.id}`"
  }

  const resumeCopyClick = () => {
    // 새로운 제목 입력을 받는 모달 또는 인풋을 표시하고, 제목 변경 이벤트 핸들러 함수를 호출합니다.
    // 이 부분에 모달 또는 인풋을 표시하는 로직을 추가해야 합니다.
    console.log(`title복제`)
  }
  const download = () => {
    console.log(`title다운로드`)
  }
  const deleteClick = () => {
    // 새로운 제목 입력을 받는 모달 또는 인풋을 표시하고, 제목 변경 이벤트 핸들러 함수를 호출합니다.
    // 이 부분에 모달 또는 인풋을 표시하는 로직을 추가해야 합니다.
    console.log(`title삭제`)
  }
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col p-5">
          <div>
            <DropdownMenu>
              {/* div 1 */}
              <div className="flex justify-end">
                <DropdownMenuTrigger>
                  <Image src="/set.svg" alt="바퀴" width={30} height={30} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="font-bold">
                    <DropdownMenuItem>
                      <button onClick={changeClick}>수정하기</button>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={resumeCopyClick}>
                      복제하기
                    </DropdownMenuItem>
                    <ResumePage />
                    <div className="text-red-500">
                      <DropdownMenuItem onClick={deleteClick}>
                        삭제
                      </DropdownMenuItem>
                    </div>
                  </div>
                </DropdownMenuContent>
              </div>
            </DropdownMenu>
          </div>

          {/* div 2 */}
          <div className="mt-3 flex grid h-20 w-full text-lg font-bold">
            {title}
          </div>

          {/* div 3 */}
          <div>{updatedAt}</div>
          {/* div 4 */}
          <div className="flex justify-end">
            <Link href="/letter">
              <ResumeButton />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
