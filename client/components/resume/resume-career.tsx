"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resumeContents } from "@/config/resume-id-contents";

interface CareerData {
  date: string;
  content: string;
}

export function ResumeCareer({
  initialCareerData,
  onInputChange,
}: {
  initialCareerData: CareerData[];
  onInputChange: (value: any) => void;
}) {
  const [formValues, setFormValues] = useState<CareerData[]>([]);

  // 부모로부터 전달된 initialCareerData가 변경될 때 formValues 업데이트
  useEffect(() => {
    setFormValues(initialCareerData);
  }, [initialCareerData]);

  // 추가 버튼 클릭 시 호출되는 함수
  const handleAddForm = () => {
    setFormValues([...formValues, { date: "", content: "" }]);
  };

  // 인덱스별 데이터 변경 핸들러
  const handleChangeData = (
    index: number,
    key: keyof CareerData,
    value: string
  ) => {
    const updatedFormValues = [...formValues];
    updatedFormValues[index][key] = value;
    setFormValues(updatedFormValues);
    onInputChange(updatedFormValues);
  };

  return (
    /* 추가버튼 디자인을 위해 세로로 2분할 하는 그리드 생성 */
    <div className="grid grid-cols-10 w-full my-3">
      {/* 왼쪽 열 */}
      <div className="col-span-7">
        <div className="mb-5">
          <Label className="mb-1 text-2xl font-bold">
            {resumeContents.career.title}
          </Label>
        </div>
        {formValues.map((formValue, index) => (
          <div key={index} className="flex mt-4 ml-5">
            <div className="flex items-center my-3 w-full">
              <span className="mr-5 flex-shrink-0">
                {resumeContents.career.contentDate}
              </span>
              <Input
                type="text"
                placeholder={resumeContents.career.period}
                className="w-1/4 mr-5"
                value={formValue.date}
                onChange={(e) => {
                  const value = e.target.value;
                  // 입력된 값이 숫자와 . - ~로만 이루어져 있는지 확인
                  if (/^[\d~\-. ]*$/.test(value)) {
                    handleChangeData(index, "date", value);
                  }
                }}
              />
              <Input
                type="text"
                placeholder={resumeContents.career.contents}
                className="w-full"
                value={formValue.content}
                onChange={(e) =>
                  handleChangeData(index, "content", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-3 flex flex-col justify-end items-start ml-3">
        <img
          src="/plus-button.svg"
          onClick={handleAddForm}
          className="mt-4 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ResumeCareer;
