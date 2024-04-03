"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { resumeContents } from "@/config/resume-id-contents";

export function ResumeCareerTextarea({
  onInputChange,
}: {
  onInputChange: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
    // 입력 값 부모 컴포넌트로 전달
    onInputChange(value);
  };

  return (
    <div className="justify-start w-full my-3">
      <Textarea
        placeholder={resumeContents.textareaContent}
        className="pt-7 my-5 ml-10 h-40"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}
