"use client";

import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { resumeContents } from "@/config/resume-id-contents";

export function ResumeLanguage({
  initialLanguage,
  onInputChange,
}: {
  initialLanguage: string;
  onInputChange: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  // 컴포넌트가 로드될 때 skillData를 초기 값으로 설정
  useEffect(() => {
    setInputValue(initialLanguage);
  }, [initialLanguage]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    // 입력 값 부모 컴포넌트로 전달
    onInputChange(value);
  };

  return (
    <div className="justify-start w-full my-3">
      <div className="mb-5">
        <Label className="mr-5 flex-shrink-0 text-2xl font-bold">
          {resumeContents.language.title}
        </Label>
      </div>
      <Textarea
        placeholder={inputValue ? "" : resumeContents.language.content}
        className="pt-12 my-5 ml-10 h-40"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}
