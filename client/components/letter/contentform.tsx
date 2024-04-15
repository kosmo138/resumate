import CategorySelector from "@/components/letter/categoryselect"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LetterBody, LetterContent } from "@/types/letter"
import { useState } from "react"
import { Input } from "../ui/input"
import Cookies from "js-cookie"

interface ContentFormProps {
  indexkey: number
  content: LetterContent
  letterBody: LetterBody
  setLetterBody: (letterBody: LetterBody) => void
  onRemove: (indexkey: number) => void
  onCategoryChange: (indexkey: number, category: string) => void;
  onAreaChange: (indexkey: number, category: string) => void;
  onInputChange: (indexkey: number, category: string) => void;
}

export default function ContentForm({ indexkey, content, letterBody, setLetterBody, onCategoryChange, onAreaChange, onInputChange }: ContentFormProps) {
  const apiUrl = `/data/letter`;
  const jwt = Cookies.get("authorization");
  const handleCategoryChange = (value: string) => {
    onCategoryChange(indexkey, value); // 선택된 값을 부모 컴포넌트로 전달
  };
  const handleAreaChange = (value: string) => {
    onAreaChange(indexkey, value);
  };
  const handleInputChange = (value: string) => {
    onInputChange(indexkey, value);
  };
  const handleSave = () => {
    console.log(letterBody)

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(letterBody), // 텍스트박스 내의 값 전체를 전송
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("저장에 실패했습니다.");
        }
        return response.json();
      })
      .catch(() => {
        // 임의의 사유로 모달창 에러 발생시
        // setSaveError(true);
      });
  };


  return (
    <>
      {indexkey !== 0 && (
        <div className="my-2 ml-20 flex w-full">
          <div className="flex items-center">
            <Label className="text-1xl mr-3 font-bold">카테고리</Label>
          </div>
          <CategorySelector
            value={content.category}
            onValueChange={handleCategoryChange}
          />
          <Button onClick={handleSave} className="ml-4">생성</Button>
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
            onChange={(e) => handleAreaChange(e.target.value)}
          />
        </div>
        <div className="mt-3 mb-6 flex flex-row items-center">
            <Input
              className="w-2/5"
              placeholder="추가 요구사항 입력"
              value={content.command}
              onChange={(e) => handleInputChange( e.target.value)}
            />
          </div>
      </div>
    </>
  )
}
