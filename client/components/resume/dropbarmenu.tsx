import ResumeButton from "./resumebutton"
import Link from "next/link"
import "/public/set.svg"
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
            <DropdownMenuItem>
              <button onClick={handleCloneResume}>복제하기</button>
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
  )
}
