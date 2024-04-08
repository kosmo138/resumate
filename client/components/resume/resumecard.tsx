import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import ResumeButton from "./resumebutton"
import Cookies from "js-cookie"
import CloneDialog from "@/components/auth/clone-dialog"
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
        console.log(data)
        setCloneOpen(true) // 클론에 성공했을 때 클론 다이얼로그를 열도록 상태를 업데이트합니다.
      })
      .catch((error) => {
        console.error("에러 발생:", error)
      })
  }

  const deleteClick = () => {
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
          <DropdownMenu>
            <div className="flex justify-end">
              <DropdownMenuTrigger>
                <Image src="/set.svg" alt="바퀴" width={30} height={30} />
              </DropdownMenuTrigger>
              {isCloneOpen && <CloneDialog />}
              <DropdownMenuContent>
                <div className="font-bold">
                  <DropdownMenuItem onClick={handleCloneClick}>
                    복제하기
                  </DropdownMenuItem>
                  <div className="text-red-500">
                    <DropdownMenuItem onClick={deleteClick}>
                      삭제하기
                    </DropdownMenuItem>
                  </div>
                </div>
              </DropdownMenuContent>
            </div>
          </DropdownMenu>

          <div className="mt-3 flex grid h-20 w-full text-lg font-bold">
            <Link href={`/resume/${id}`} passHref>
              {title}
            </Link>
          </div>
          <div>{modified}</div>
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
