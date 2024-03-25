"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DoubleForm({
  onChange,
}: {
  onChange: (newFormData: any) => void;
}) {
  const [formData, setFormData] = useState({
    title: "Input Value",
    contentdate: "Date",
    period: "Period",
    contents: "Contents",
    count: 1,
  });

  const handleAddForm = () => {
    setFormData((prevState) => ({
      ...prevState,
      count: prevState.count + 1,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };

  // 부모 컴포넌트로 데이터 전달
  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  return (
    <div className="grid grid-cols-10 w-full my-3">
      <div className="col-span-7">
        <div className="mb-5">
          <Label className="mb-1 text-2xl font-bold">{formData.title}</Label>
        </div>
        {[...Array(formData.count)].map((_, index) => (
          <div key={index} className="flex mt-4 ml-5">
            <div className="flex items-center my-3 w-full">
              <span className="mr-5 flex-shrink-0">{formData.contentdate}</span>
              <Input
                type="text"
                placeholder={formData.period}
                className="w-1/4 mr-5"
                onChange={(e) => handleChange(e, "period")}
              />
              <Input
                type="text"
                placeholder={formData.contents}
                className="w-full"
                onChange={(e) => handleChange(e, "contents")}
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

export default DoubleForm;
