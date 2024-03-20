import { Card, CardContent, CardFooter } from "@/components/ui/card"
import ResumeButton from "./resumebutton"
import Link from "next/link"
import handleCloneResume from "./copyresume"
import ResumeCopyCard from "./copyresume"
import { format } from "date-fns"

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
  const onClick = () => {
    // 클릭 시 할 일을 여기에 작성
    console.log("버튼이 클릭되었습니다.")
  }

  return (
    <Card>
      <div className="md-0 flex">
        <CardContent>
          <div className="mt-10 text-left text-lg font-bold ">
            <h3>{title}</h3>
          </div>
        </CardContent>
        <div className=" flex justify-end ">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className=" margin-left: auto flex justify-end">
                <img src="/set.svg" alt="바퀴" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="font-bold">
                <Link href={`/edit-title`} passHref>
                  <DropdownMenuItem>제목변경</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleCloneResume}>
                  복제하기
                </DropdownMenuItem>

                <Link href={`download`} passHref>
                  <DropdownMenuItem>다운로드</DropdownMenuItem>
                </Link>
                <div className="text-red-500">
                  <Link href={`/delete`} passHref>
                    <DropdownMenuItem>삭제</DropdownMenuItem>
                  </Link>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <CardFooter>
        <div className="flex items-end justify-end p-1">
          <p>{updatedAt}</p>

          <Link href="/letter">
            <div className="flex items-end justify-end pr-2">
              <ResumeButton />
            </div>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
