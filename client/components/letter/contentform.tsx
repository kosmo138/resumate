import CategorySelector from "@/components/letter/categoryselect";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LetterBody, LetterContent } from "@/types/letter";
import { useState } from "react";

interface ContentFormProps {
  indexkey: number;
  content: LetterContent;
  letterBody: LetterBody;
  setLetterBody: (letterBody: LetterBody) => void;
  onRemove: (indexkey: number) => void;
  onCategoryChange: (indexkey: number, category: string) => void;
}

export default function ContentForm({
  indexkey,
  content,
  letterBody,
  setLetterBody,
  onRemove,
  onCategoryChange,
}: ContentFormProps) {
  const { category, text } = content;

  const handleCategoryChange = (value: string) => {
    console.log("2번째자식" + indexkey + value);
    onCategoryChange(indexkey, value); // 선택된 값을 부모 컴포넌트로 전달
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
            onValueChange={handleCategoryChange} // 인덱스와 카테고리를 전달
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
                if (i === indexkey) {
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
  );
}
