import React from "react"
import { Button } from "@/components/ui/button"

export default function ResumeButton() {
  const url = "http://localhost/api/resume/"

  const handleClick = () => {
    //POST할 데이터
    const data = {
      title: "",
      carrerData: [{ data: "", content: "" }],
      carrerText: "",
      education: [{ data: "", content: "" }],
      skill: "",
      award: [{ data: "", content: "" }],
      language: "",
    }
    //fetch를 사용하여 post 요청 보내기
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json() //응답 JSON파싱
      })
      .then((json) => {
        console.log("POST 요청 성공:", json)
      })
      .catch((error) => {
        console.log("POST 요청실패", error)
      })
  }

  return (
    <Button onClick={handleClick} className="ml-10 h-10 px-3 py-2">
      자기소개서 작성
    </Button>
  )
}
