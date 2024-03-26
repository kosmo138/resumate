"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resumeContents } from "@/config/resume-id-contents";
import { useState } from "react";

export function ResumeTitle({ onInputTitle }: { onInputTitle: any }) {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
    // 입력 값 부모 컴포넌트로 전달
    onInputTitle(value);
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
