import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Cookies from "js-cookie"
import { LetterHead } from "@/types/letter"

interface AddButtonProps {
  setLetterList: (headList: Array<LetterHead>) => void
}

export default function LetterAddButton({ setLetterList }: AddButtonProps) {
  const reloadLetterList = () => {
    fetch(`/api/letter`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("authorization")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        setLetterList(data)
      })
      .catch((error) => {
        console.log("POST 에러:", error)
      })
  }

  const handleButtonClick = () => {
    const Letterdata = {
      resume_id: 1,
      title: "새 자기소개서",
      company: "",
      job: "",
      content: [{ category: "", text: "" }],
    }

    fetch(`/api/letter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("authorization")}`,
      },
      body: JSON.stringify(Letterdata),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        reloadLetterList()
      })
      .catch((error) => {
        console.log("POST 에러:", error)
      })
  }
  return (
    <>
      <Card onClick={handleButtonClick}>
        <CardContent>
          <div className="mb-10 mt-8 text-center text-lg font-bold">
            <button>
              <Image src="/add.svg" width={120} height={120} alt="add" />
            </button>
            <h3>새로 만들기</h3>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
