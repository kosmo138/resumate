import { ResumeHead } from "@/types/resume"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Cookies from "js-cookie"

interface AddButtonProps {
  setResumeList: (headList: Array<ResumeHead>) => void
}

export default function ResumeAddButton({ setResumeList }: AddButtonProps) {
  const reloadResumeList = () => {
    fetch(`/api/resume`, {
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
        setResumeList(data)
      })
      .catch((error) => {
        console.log("POST 에러:", error)
      })
  }

  const handleButtonClick = () => {
    const Resumedata = {
      title: "새 이력서",
      careerData: [{ date: "", content: "" }],
      careerText: "",
      education: [{ date: "", content: "" }],
      skill: "",
      award: [{ date: "", content: "" }],
      language: "",
    }

    fetch(`/api/resume`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("authorization")}`,
      },
      body: JSON.stringify(Resumedata),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        reloadResumeList()
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
