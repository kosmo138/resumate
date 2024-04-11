import CategorySelector from "@/components/letter/categoryselect"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LetterBody, LetterContent } from "@/types/letter"
import { useState } from "react"

interface ContentFormProps {
  key: number
  content: LetterContent
  letterBody: LetterBody
  setLetterBody: (letterBody: LetterBody) => void
  onRemove: (index: number) => void
}

export default function ContentForm({ key, content, letterBody, setLetterBody }: ContentFormProps) {
  const { category, text } = content

  return (
    <>
      {key !== 0 && (
        <div className="my-2 ml-20 flex w-full">
          <div className="flex items-center">
            <Label className="text-1xl mr-3 font-bold">카테고리</Label>
          </div>
          <CategorySelector
            value={content.category}
            onValueChange={(value) => {
              const newContent = [...letterBody.content]; // content 배열 복사
              newContent[key] = { ...newContent[key], category: value }; // 해당 인덱스의 category 값 변경
              setLetterBody({ ...letterBody, content: newContent }); // 변경된 내용으로 state 업데이트
            }}
          />
          <Button className="ml-4">생성</Button>
        </div>
      )}

      <div className="mb-4 ml-20 w-full">
        <div className="items-center">
          <Label className="text-1xl hidden">자기소개서 생성</Label>
        </div>
        <div>
          <Textarea
            className="mt-2 w-2/3"
            value={content.text}
            onChange={(e) => {
              const newContent = letterBody.content.map((c, i) => {
                if (i === key) {
                  return { ...c, text: e.target.value };
                }
                return c;
              });
              setLetterBody({ ...letterBody, content: newContent });
            }}
          />
        </div>
      </div>
    </>
  )
}
