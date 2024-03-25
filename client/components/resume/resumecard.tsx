"use client"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import ResumeButton from "./resumebutton"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import React, { useEffect } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import axios from "axios"

export default function ResumeCard({
  title,
  updatedAt,
}: {
  title?: string
  updatedAt?: string
}) {
  // 클릭 이벤트 처리 함수
  const handleClick = () => {
    // 클릭 시 할 일을 여기에 작성
    alert("버튼이 클릭되었습니다.")
  }
  // 새로운 제목을 상태로 관리합니다.
  const [newTitle, setNewTitle] = useState<string | undefined>(title)

  // 제목을 변경하는 이벤트 핸들러 함수입니다.
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 새로운 제목을 입력한 값을 상태로 업데이트합니다.
    setNewTitle(e.target.value)
  }
  // // DropdownMenuItem를 클릭했을 때 호출되는 함수입니다.
  const handleTitleChangeClick = () => {
    //   function ResumeCarding({ id }) {
    //     const [resumeData, setResumeData] = useState(null)

    //     useEffect(() => {
    //       // 이력서 데이터를 가져오는 함수
    //       const fetchResumeData = async () => {
    //         try {
    //           const response = await axios.get(
    //             `https://backend.example.com/resumes/${id}`
    //           )
    //           setResumeData(response.data) // 받아온 데이터를 상태에 저장
    //         } catch (error) {
    //           console.error("이력서 데이터를 가져오는 중 오류 발생:", error)
    //         }
    //       }

    //       // 컴포넌트가 마운트될 때 이력서 데이터를 가져옴
    //       fetchResumeData()

    //       // eslint-disable-next-line react-hooks/exhaustive-deps
    //     }, []) // id가 변경될 때마다 실행되도록 하려면 id를 의존성 배열에 추가

    //     if (!resumeData) {
    //       return <div>Loading...</div> // 데이터를 받아오기 전에는 로딩 중을 표시
    //     }

    alert(`${title} 제목변경 하시겠습니까?`)
  }
  const resumeCopyClick = () => {
    // 새로운 제목 입력을 받는 모달 또는 인풋을 표시하고, 제목 변경 이벤트 핸들러 함수를 호출합니다.
    // 이 부분에 모달 또는 인풋을 표시하는 로직을 추가해야 합니다.
    alert(`${title} 복제 하시겠습니까?`)
  }
  const download = () => {
    // 새로운 제목 입력을 받는 모달 또는 인풋을 표시하고, 제목 변경 이벤트 핸들러 함수를 호출합니다.
    // 이 부분에 모달 또는 인풋을 표시하는 로직을 추가해야 합니다.
    alert(`${title} 다운로드 하시겠습니까?`)
  }
  const deleteClick = () => {
    // 새로운 제목 입력을 받는 모달 또는 인풋을 표시하고, 제목 변경 이벤트 핸들러 함수를 호출합니다.
    // 이 부분에 모달 또는 인풋을 표시하는 로직을 추가해야 합니다.
    alert(`${title} 삭제 하시겠습니까?`)
  }
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col p-5">
          <div>
            <DropdownMenu>
              {/* div 1 */}
              <div className="ms-2 flex justify-end">
                <DropdownMenuTrigger>
                  <Image src="/set.svg" alt="바퀴" width={30} height={30} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="font-bold">
                    <DropdownMenuItem onClick={handleTitleChangeClick}>
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
          <div className="mt-3 font-bold">
            {/* <Input
              type="text"
              id="ResumeTitle"
              name="title"
              value={title}
              placeholder="제목을 수정해주세요"
            /> */}
            <Input
              type="text"
              value={newTitle} // 새로운 제목 상태를 value로 설정합니다.
              onChange={handleTitleChange} // 입력 값이 변경될 때마다 이벤트 핸들러를 호출합니다.
              placeholder="제목을 수정해주세요"
            />
          </div>
          {/* div 3 */}
          <div className="ml-2 mt-3">{updatedAt}</div>
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
