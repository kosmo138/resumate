"use client";

import React, { useState, useEffect } from "react";
import { ResumeCareer } from "@/components/resume/resume-career";
import { ResumeTitle } from "@/components/resume/resume-title";
import { ResumeCareerTextarea } from "@/components/resume/resume-career-textarea";
import { ResumeEducation } from "@/components/resume/resume-education";
import { ResumeSkill } from "@/components/resume/resume-skill";
import { ResumeAward } from "@/components/resume/resume-award";
import { ResumeLanguage } from "@/components/resume/resume-language";
import ResumeCancleButton from "@/components/resume/resume-cancle-button";
import HeadingText from "@/components/heading-text";
import Cookies from "js-cookie";
import ResumeSubmitButton from "@/components/resume/resume-submit-button";

export default function ResumeEditor({ params }: { params: { id: string } }) {
  const apiUrl = `/api/resume/${params.id}`;
  const jwt = Cookies.get("authorization");

  // 더미 데이터
  const initialData = {
    title: "",
    careerData: [{ date: "", content: "" }],
    careerText: "",
    education: [{ date: "", content: "" }],
    skill: "",
    award: [{ date: "", content: "" }],
    language: "",
  };

  const [formData, setFormData] = useState({
    title: initialData.title,
    careerData: initialData.careerData,
    careerText: initialData.careerText,
    education: initialData.education,
    skill: initialData.skill,
    award: initialData.award,
    language: initialData.language,
  });

  useEffect(() => {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("오류가 발생했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        const {
          title,
          careerData,
          careerText,
          education,
          skill,
          award,
          language,
        } = data;
        setFormData({
          title: title || initialData.title,
          careerData: careerData || initialData.careerData,
          careerText: careerText || initialData.careerText,
          education: education || initialData.education,
          skill: skill || initialData.skill,
          award: award || initialData.award,
          language: language || initialData.language,
        });
      })
      .catch((error) => {
        console.error("데이터를 가져오는 동안 오류가 발생했습니다:", error);
      });
  }, [apiUrl]); // apiUrl, jwt가 변경될 때마다 useEffect 재실행

  // 자식 컴포넌트에서 전달된 값 처리
  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  // 폼 제출 이벤트 핸들러
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(JSON.stringify(formData));
    // 공백을 포함하지 않은 데이터만 필터링
    const filteredFormData = {
      ...formData,
      careerData: formData.careerData.filter(
        (value, index) =>
          index === 0 || value.date.trim() !== "" || value.content.trim() !== ""
      ),
      education: formData.education.filter(
        (value, index) =>
          index === 0 || value.date.trim() !== "" || value.content.trim() !== ""
      ),
      award: formData.award.filter(
        (value, index) =>
          index === 0 || value.date.trim() !== "" || value.content.trim() !== ""
      ),
    };

    try {
      //bearerToken 설정부분

      fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(filteredFormData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("이력서 데이터 전송 실패!");
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
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
        <ResumeTitle
          initialTitle={formData.title}
          onInputChange={(value) => handleInputChange("title", value)}
        />
        <ResumeCareer
          initialCareerData={formData.careerData}
          onInputChange={(value) => handleInputChange("careerData", value)}
        />
        <ResumeCareerTextarea
          initialCareerText={formData.careerText}
          onInputChange={(value) => handleInputChange("careerText", value)}
        />
        <ResumeEducation
          initialEducation={formData.education}
          onInputChange={(value) => handleInputChange("education", value)}
        />
        <ResumeSkill
          initialSkill={formData.skill}
          onInputChange={(value) => handleInputChange("skill", value)}
        />
        <ResumeAward
          initialAward={formData.award}
          onInputChange={(value) => handleInputChange("award", value)}
        />
        <ResumeLanguage
          initialLanguage={formData.language}
          onInputChange={(value) => handleInputChange("language", value)}
        />
        <div className="flex justify-center items-center gap-4 mt-10">
          <ResumeCancleButton />
          <ResumeSubmitButton />
        </div>
      </form>
    </main>
  );
}
