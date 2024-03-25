import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import ResumeButton from "./resumebutton"
import Image from "next/image"
import { Input } from "@/components/ui/input"

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
          <div>
            <DropdownMenu>
              {/* div 1 */}

              <div className="ms-2 flex justify-end">
                <DropdownMenuTrigger>
                  <Image src="/set.svg" alt="바퀴" width={30} height={30} />
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
              </div>
            </DropdownMenu>
          </div>

          {/* div 2 */}
          <div className="mt-3 font-bold">
            <Input
              title="example-title"
              type="text"
              id="ResumeTitle"
              name="title"
              value={title}
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
