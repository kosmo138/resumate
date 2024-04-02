"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { resumeContents } from "@/config/resume-id-contents";
import React, { useState, useEffect } from "react";

export default function ResumeSkill({
  initialSkill,
  onInputChange,
}: {
  initialSkill: string;
  onInputChange: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  // 컴포넌트가 로드될 때 skillData를 초기 값으로 설정
  useEffect(() => {
    setInputValue(initialSkill);
  }, [initialSkill]);

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
