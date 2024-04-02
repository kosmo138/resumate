import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import ResumeButton from "./resumebutton"
import Image from "next/image"
import React from "react"

import Cookies from "js-cookie"
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
  const cloneClick = () => {
    // 서버로 클론 요청을 보내는 비동기 함수 호출
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
        alert(data.message)
        window.location.reload()
        // 클론 성공 시, 필요한 작업 수행
      })
      .catch((error) => {
        console.error("에러 발생:", error)
        // 에러 처리
      })
  }

  const deleteClick = () => {
    // // 클릭 이벤트 처리 함수
    // 이부분에 fetch 함수 써서 삭제 요청
    const url = `/api/resume/${id}`

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
                    <DropdownMenuItem onClick={cloneClick}>
                      복제
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
