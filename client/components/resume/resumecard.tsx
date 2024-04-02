import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import ResumeButton from "./resumebutton"
import Image from "next/image"
import React from "react"
import ResumePage from "./resumedownload"
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
  const changeClick = () => {
    window.location.href = "/resume/{resumeHead.id}"
  }
  const cloneClick = () => {
    console.log(`title복제`)
  }
  const download = () => {
    console.log(`title다운로드`)
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
                    <DropdownMenuItem>복제</DropdownMenuItem>
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
