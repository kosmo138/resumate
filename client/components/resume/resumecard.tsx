"use client"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import ResumeButton from "./resumebutton"
import Image from "next/image"
import { CardInput } from "@/components/cardinput"
import React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export default function ResumeCard({
  title,
  updatedAt,
}: {
  title?: string
  updatedAt?: string
}) {
  // 새로운 제목을 상태로 관리합니다.
  const [newTitle, setNewTitle] = useState(title)
  // 제목을 변경하는 이벤트 핸들러 함수입니다.
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 새로운 제목을 입력한 값을 상태로 업데이트합니다.
    console.log("새로운 제목을 입력한 값을 상태로 업데이트")
    setNewTitle(e.target.value + "1")
  }
  // // DropdownMenuItem를 클릭했을 때 호출되는 함수입니다.
  const handleTitleChangeClick = () => {
    console.log(`${title} 제목변경`)
  }
  const resumeCopyClick = () => {
    // 새로운 제목 입력을 받는 모달 또는 인풋을 표시하고, 제목 변경 이벤트 핸들러 함수를 호출합니다.
    // 이 부분에 모달 또는 인풋을 표시하는 로직을 추가해야 합니다.
    console.log(`${title} 복제`)
  }
  const download = () => {
    // 새로운 제목 입력을 받는 모달 또는 인풋을 표시하고, 제목 변경 이벤트 핸들러 함수를 호출합니다.
    // 이 부분에 모달 또는 인풋을 표시하는 로직을 추가해야 합니다.
    console.log(`${title} 다운로드`)
  }
  const deleteClick = () => {
    // 새로운 제목 입력을 받는 모달 또는 인풋을 표시하고, 제목 변경 이벤트 핸들러 함수를 호출합니다.
    // 이 부분에 모달 또는 인풋을 표시하는 로직을 추가해야 합니다.
    console.log(`${title} 삭제`)
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
                    <DropdownMenuItem
                      onClick={handleTitleChangeClick}
                      onChange={handleTitleChange}
                    >
                      제목변경
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={resumeCopyClick}>
                      복제하기
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={download}>
                      다운로드
                    </DropdownMenuItem>
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
          <div className="font-bold">
            {/* <Input
              type="text"
              id="ResumeTitle"
              name="title"
              value={title}
              placeholder="제목을 수정해주세요"
            /> */}

            <CardInput
              value={newTitle} // 새로운 제목 상태를 value로 설정
              onChange={(e) => setNewTitle(e.target.value)} // 입력 값이 변경될 때마다 이벤트 핸들러를 호출하여 새로운 제목을 업데이트
              type="text" // 입력 필드의 타입
              placeholder="제목을 수정해주세요" // 입력 필드에 보여질 placeholder 텍스트
              onKeyDown={(e) => {
                //Enter키가 눌렸을 때
                if (e.key === "Enter") {
                  //여기에 저장 동작을 추가
                  console.log("Enter.Status OK")
                }
              }}
            />
          </div>
          {/* div 3 */}
          <div className="ml-0">{updatedAt}</div>
          {/* div 4 */}
          <div className="mt-5 flex justify-end">
            <Link href="/letter">
              <ResumeButton />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
