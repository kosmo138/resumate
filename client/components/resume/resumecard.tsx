import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import ResumeButton from "./resumebutton"
import Image from "next/image"
import React, { useEffect } from "react"
import Cookies from "js-cookie"
import { useState } from "react"
import { ResumeHead } from "@/types/resume"
import CloneDialog from "../auth/clone-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ResumeCard({
  id,
  title,
  modified,
}: {
  id?: number
  title?: string
  modified?: string
}) {
  const [isCloneOpen, setCloneOpen] = useState<boolean>(false)
  const [resumeData, setResumeData] = useState<any[]>([])
  const url = `/api/resume/${id}`

  const handleCloneClick = () => {
    fetch(`/api/resume/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("authorization")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("클론에 실패했습니다.")
      })
      .then((data) => {
        console.log("성공적")
        location.reload()
      })
      .catch((error) => {
        console.error("에러 발생:", error)
        // 에러 처리
      })
  }
  const deleteClick = () => {
    // // 클릭 이벤트 처리 함수
    // 이부분에 fetch 함수 써서 삭제 요청
    //DELETE 요청 보내기
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("authorization")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        } else {
          location.reload()
        }
      })
      .catch((error) => {
        console.log("Error:", error)
      })
  }

  // const fetchResumeGetData = () => {
  //   // 이력서 데이터 가져오기
  //   fetch(url, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${Cookies.get("authorization")}`,
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok")
  //       }
  //       return response.json()
  //     })
  //     .then((responseData) => {
  //       setResumeData(responseData) // 데이터 설정
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error)
  //     })
  // }
  // useEffect(() => {
  //   // 이력서 데이터 가져오기
  //   fetchResumeGetData()
  // }, []) // 컴포넌트가 마운트될 때 한 번만 실행

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
                    <DropdownMenuItem onClick={handleCloneClick}>
                      복제
                    </DropdownMenuItem>
                    {isCloneOpen && <CloneDialog />}

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
            <Link href={`/resume/${id}`} passHref>
              {title}
            </Link>
          </div>

          {/* div 3 */}
          <div>{modified}</div>
          {/* div 4 */}
          <div className="flex justify-end">
            <Link href="/letter/edit/${resumeHead.id}">
              <ResumeButton />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
