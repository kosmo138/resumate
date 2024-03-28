"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resumeContents } from "@/config/resume-id-contents";
import { useState, useEffect } from "react";

export function ResumeTitle({
  titleData,
  onInputChange,
}: {
  titleData: string;
  onInputChange: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  // ResumeTitle 컴포넌트가 로드될 때 titleData를 초기 값으로 설정
  useEffect(() => {
    setInputValue(titleData);
  }, [titleData]);

  const handleChange = (e: any) => {
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
        placeholder={inputValue ? "" : resumeContents.titleContent}
        className="w-3/5 border-none"
        value={inputValue !== "" ? inputValue : titleData}
        onChange={handleChange}
      />
    </div>
  );
}
