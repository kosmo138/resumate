"use client";

import React, { useState, useEffect, useRef } from "react";
import ResumeCareer from "@/components/resume/resume-career";
import ResumeTitle from "@/components/resume/resume-title";
import ResumeCareerTextarea from "@/components/resume/resume-career-textarea";
import ResumeEducation from "@/components/resume/resume-education";
import ResumeSkill from "@/components/resume/resume-skill";
import ResumeAward from "@/components/resume/resume-award";
import ResumeLanguage from "@/components/resume/resume-language";
import ResumeCancelButton from "@/components/resume/resume-cancel-button";
import HeadingText from "@/components/heading-text";
import Cookies from "js-cookie";
import ResumeSubmitButton from "@/components/resume/resume-submit-button";
import ResumeError from "@/components/resume/resume-error-modal";
import ResumePage from "@/components/resume/resumedownload";
import { ResumeBody } from "@/types/resume";

export default function ResumeEditor({ params }: { params: { id: string } }) {
  // url 경로
  const apiUrl = `/api/resume/${params.id}`;
  // bearer 토큰 관리(추후 수정 예상)
  const jwt = Cookies.get("authorization");
  // 브라우저 경로로 권한 없는 이력서 접속 시 뜨는 모달창
  const [errorPageOpen, setErrorPageOpen] = useState(false);
  // 화면을 pdf파일로 저장하기 위해 dom 구역 지정을 위한 useRef 활용
  // null값으로 초기화 하지 않으면 prop부분에서 undefined 에러 발생
  const resumeRef = useRef<HTMLDivElement>(null);
  // 이력서 제목이 없을 경우에 모달창 조건부 랜더링
  const [isError, setIsError] = useState(false);
  // 이력서 저장이 무언가로 인해 오류가 발생겼을경우 모달창 조건부 랜더링
  const [saveError, setSaveError] = useState(false);

  // 동적으로 변하는 이력서 데이터를 useState로 관리하기 위해 이력서 폼 초기화
  const [formData, setFormData] = useState<ResumeBody>({
    title: "",
    careerData: [{ date: "", content: "" }],
    careerText: "",
    education: [{ date: "", content: "" }],
    skill: "",
    award: [{ date: "", content: "" }],
    language: "",
  });

  // rest api로 등록된 이력서로 화면에 랜더링하기 위한 초기값 설정
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
      .then((data) => setFormData(data))
      .catch(() => {
        // 브라우저 통해 권한없는 이력서 경로로 접속시 모달창 활성화
        setErrorPageOpen(true);
      });
  }, [apiUrl]); // 웹 경로 변경될 때마다 useEffect 재실행

  // 자식 컴포넌트에서 전달된 값 처리
  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  // 폼 제출 이벤트 핸들러
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // title에 아무것도 입력이 안 되어있으면 db로 전송이 되지 않기때문에 임의의 제목 입력
    // '2번째 목록 이후'로 공백(입력을 아무것도 하지 않은)을 제외한 데이터만 필터링해서 저장하기 위함
    // formdata를 저장할 때 아무것도 입력하지 않은 공백란은 저장하지 않으려고 trim 함수 사용
    // ex) 2번째 경력란에 날짜와 컨텐츠에 "  " 처럼 공백만 있을 경우 DB에 전달하지 않기 위함
    const filteredFormData = {
      ...formData,
      title: formData.title === "" ? setIsError(true) : formData.title,
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

    // 이력서를 restAPI 통해 db로 전달
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
          throw new Error("이력서 저장에 실패했습니다.");
        }
        return response.json();
      })
      .catch(() => {
        setSaveError(true);
      });
  };

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="자소서 생성에 필요한 최소의 정보를 입력해 주세요">
        이력서 수정
      </HeadingText>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full"
      ></div>
      <form className="w-full" onSubmit={handleSubmit}>
        <div ref={resumeRef}>
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
        </div>
        <div className="flex justify-center items-center gap-4 mt-10">
          <ResumeCancelButton />
          <ResumeSubmitButton isError={isError} saveError={saveError} />
          <ResumePage resumeRef={resumeRef} />
        </div>
      </form>
      <ResumeError error={errorPageOpen} />
    </main>
  );
}
