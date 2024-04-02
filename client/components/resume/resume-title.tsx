"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resumeContents } from "@/config/resume-id-contents";
import { useState, useEffect } from "react";

export default function ResumeTitle({
  initialTitle,
  onInputChange,
}: {
  initialTitle: string;
  onInputChange: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  // 컴포넌트가 로드될 때 titleData를 초기 값으로 설정
  useEffect(() => {
    // 문서 초기생성시 title값이 " "이기 때문에 placeholder를 보여주기 위해 조건문 작성
    if (initialTitle === " ") {
      setInputValue("");
    } else {
      setInputValue(initialTitle);
    }
  }, [initialTitle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    // 입력 값 부모 컴포넌트로 전달
    onInputChange(value);
  };

  return (
    <div className="flex w-full my-3 mt-10">
      <Label className="mr-5 pt-0 mt-0 flex-shrink-0 text-2xl font-bold">
        {resumeContents.title}
      </Label>
      <Input
        type="text"
        placeholder={resumeContents.titleContent}
        className="w-3/5 border-none"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}
