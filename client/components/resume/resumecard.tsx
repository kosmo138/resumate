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
        <div className="flex flex-col p-5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              {/* div 1 */}
              <div className="ms-2 ">
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

          {/* div 2 */}
          <div className="mt-3 flex justify-between font-bold">
            <input
              type="text"
              id="ResumeTitle"
              name="title"
              value={title}
              className="w-full border border-gray-100 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          {/* div 3 */}
          <div className="ml-2 mt-3">{updatedAt}</div>
          {/* div 4 */}
          <div className="ml-20 mt-5 p-1">
            <Link href="/letter">
              <ResumeButton />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
