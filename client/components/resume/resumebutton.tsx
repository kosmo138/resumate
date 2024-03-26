import React from "react"
import { Button } from "@/components/ui/button"

export default function ResumeButton() {
  const handleClick = () => {
    console.log("자기소개서 작성")
  }

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="ml-10 h-10 px-3 py-2"
    >
      자기소개서 작성
    </Button>
  )
}
