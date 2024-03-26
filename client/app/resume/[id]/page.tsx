"use client";

import React, { useState } from "react";
import { ResumeCareer } from "@/components/resume/resume-career";
import { ResumeTitle } from "@/components/resume/resume-title";
import { ResumeCareerTextarea } from "@/components/resume/resume-career-textarea";
import { ResumeEducation } from "@/components/resume/resume-education";
import { ResumeSkill } from "@/components/resume/resume-skill";
import { ResumeAward } from "@/components/resume/resume-award";
import { ResumeLanguage } from "@/components/resume/resume-language";
import ResumeCancleButton from "@/components/resume/resume-cancle-button";
import HeadingText from "@/components/heading-text";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

export default function ResumeEditor(id: string) {
  /* GET 요청에 대한 응답이 없으면 404 오류 페이지를 표시합니다 */
  /*const response = await fetch(`${baseUrl}/api/resume/${id}`)
    .then((res) => res.json())
    .catch(() => notFound());
  const resumeBody: ResumeBody = response.parse();
  */

  const [title, setTitle] = useState("");
  const [careerData, setCareerData] = useState([{ date: "", content: "" }]);
  const [careerText, setcareerText] = useState("");
  const [education, setEducation] = useState([{ date: "", content: "" }]);
  const [skill, setSkill] = useState("");
  const [award, setAward] = useState("");
  const [language, setLanguage] = useState("");

  // 자식 컴포넌트에서 전달된 값 처리
  const handleInputTitle = (value: any) => {
    setTitle(value);
  };
  const handleInputCareerData = (value: any) => {
    setCareerData(value);
  };
  const handleInputCareerText = (value: any) => {
    setcareerText(value);
  };
  const handleInputEducation = (value: any) => {
    setEducation(value);
  };
  const handleInputSkill = (value: any) => {
    setSkill(value);
  };
  const handleInputAward = (value: any) => {
    setAward(value);
  };
  const handleInputLanguage = (value: any) => {
    setLanguage(value);
  };

  // 폼 제출 이벤트 핸들러
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 제출 동작 방지
    console.log({
      title,
      careerData,
      careerText,
      education,
      skill,
      award,
      language,
    });
  };

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="자기소개서 생성에 필요한 최소의 정보를 입력해 주세요.">
        이력서
      </HeadingText>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full"
      ></div>
      <form className="w-full" onSubmit={handleSubmit}>
        <ResumeTitle onInputTitle={handleInputTitle} />
        <ResumeCareer onInputCareerData={handleInputCareerData} />
        <ResumeCareerTextarea onInputCareerText={handleInputCareerText} />
        <ResumeEducation onInputEducation={handleInputEducation} />
        <ResumeSkill onInputSkill={handleInputSkill} />
        <ResumeAward onInputAward={handleInputAward} />
        <ResumeLanguage onInputLanguage={handleInputLanguage} />
        <div className="flex justify-center items-center gap-4 mt-10">
          <ResumeCancleButton />
          <Button type="submit">저장</Button>
        </div>
      </form>
    </main>
  );
}
