import React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "lucide-react"

export default function ResumeButton({ buttonName }: { buttonName?: string }) {
  return (
    <Button>
      <Button
        variant="outline"
        className="  mt-10 flex items-start justify-end bg-black text-center text-white"
      >
        자기소개서 작성
      </Button>
    </Button>
  )
}
