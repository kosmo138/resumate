import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function TitleModal({ onClose, onSave }) {
  const [newTitle, setNewTitle] = useState("")

  const handleInputChange = (e) => {
    setNewTitle(e.target.value)
  }

  const handleSave = () => {
    onSave(newTitle)
    onClose()
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <Input
          type="text"
          value={newTitle}
          onChange={handleInputChange}
          placeholder="새 제목을 입력하세요"
        />
        <Button variant="outline" onClick={handleSave}>
          저장
        </Button>
        <Button onClick={onClose}>취소</Button>
      </div>
    </div>
  )
}
