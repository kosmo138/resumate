"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import ResumeButton from "./resumebutton"
import Image from "next/image"

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
  // 클릭 이벤트 처리 함수
  const handleClick = () => {
    // 클릭 시 할 일을 여기에 작성
    alert("버튼이 클릭되었습니다.")
  }

  return (
    <Card>
      <CardContent>
        <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <input type="text" id="ResumeTitle" name="title" />
          {title}
        </div>
      </CardContent>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="icons-end">
            <Image src="/set.svg" alt="바퀴" width={30} height={30} />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <div className="font-bold">
            <DropdownMenuItem>제목변경</DropdownMenuItem>
            <DropdownMenuItem>복제하기</DropdownMenuItem>
            <DropdownMenuItem>다운로드</DropdownMenuItem>
            <div className="text-red-500">
              <DropdownMenuItem>삭제</DropdownMenuItem>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <CardFooter>
        <p>{updatedAt}</p>
        <Link href="/letter">
          <ResumeButton />
        </Link>
      </CardFooter>
    </Card>
  )
}
