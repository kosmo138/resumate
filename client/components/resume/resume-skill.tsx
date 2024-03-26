"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { resumeContents } from "@/config/resume-id-contents";
import React, { useState } from "react";

export function ResumeSkill({ onInputSkill }: { onInputSkill: any }) {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
    // 입력 값 부모 컴포넌트로 전달
    onInputSkill(value);
  };

  return (
    <div className="justify-start w-full my-3">
      <div className="mb-5">
        <Label className="mr-5 flex-shrink-0 text-2xl font-bold">
          {resumeContents.skill.title}
        </Label>
      </div>
      <Textarea
        placeholder={resumeContents.skill.content}
        className="pt-12 my-5 ml-10 h-40"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}
