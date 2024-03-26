"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resumeContents } from "@/config/resume-id-contents";

interface EducationData {
  date: string;
  content: string;
}

export function ResumeEducation({
  onInputEducation,
}: {
  onInputEducation: any;
}) {
  const [formValues, setFormValues] = useState<EducationData[]>([
    { date: "", content: "" },
  ]);

  // 추가 버튼 클릭 시 호출되는 함수
  const handleAddForm = () => {
    setFormValues([...formValues, { date: "", content: "" }]);
  };

  // 특정 인덱스의 데이터 변경 핸들러
  const handleChangeData = (
    index: number,
    key: keyof EducationData,
    value: string
  ) => {
    const updatedFormValues = [...formValues];
    updatedFormValues[index][key] = value;
    setFormValues(updatedFormValues);
    onInputEducation(updatedFormValues);
  };

  return (
    /* 추가버튼 디자인을 위해 세로로 2분할 하는 그리드 생성 */
    <div className="grid grid-cols-10 w-full my-3">
      {/* 왼쪽 열 */}
      <div className="col-span-7">
        <div className="mb-5">
          <Label className="mb-1 text-2xl font-bold">
            {resumeContents.education.title}
          </Label>
        </div>
        {/* 항목 추가 함수 */}
        {formValues.map((formValue, index) => (
          <div key={index} className="flex mt-4 ml-5">
            <div className="flex items-center my-3 w-full">
              <span className="mr-5 flex-shrink-0">
                {resumeContents.education.contentDate}
              </span>
              <Input
                type="text"
                placeholder={resumeContents.education.period}
                className="w-1/4 mr-5"
                value={formValue.date}
                onChange={(e) =>
                  handleChangeData(index, "date", e.target.value)
                }
              />
              <Input
                type="text"
                placeholder={resumeContents.education.contents}
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
      {/* 오른쪽 열 */}
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

export default ResumeEducation;
