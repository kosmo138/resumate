"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DoubleForm({
  title,
  contentdate,
  period,
  contents,
  count,
}: {
  title: string;
  contentdate: string;
  period: string;
  contents: string;
  count: number;
}) {
  const [formCount, setFormCount] = useState(count);

  // 추가 버튼 클릭 시 호출되는 함수
  const handleAddForm = () => {
    setFormCount(formCount + 1);
  };

  return (
    <div className="grid grid-cols-10 w-full my-3">
      {/* 왼쪽 열 */}
      <div className="col-span-7">
        <div className="mb-5">
          <Label className="mb-1 text-2xl font-bold">{title}</Label>
        </div>
        {[...Array(formCount)].map((_, index) => (
          <div key={index} className="flex mt-4 ml-5">
            <div className="my-3 w-full">
              <div className="flex items-center">
                <span className="mr-5 flex-shrink-0">{contentdate}</span>
                <Input
                  type="text"
                  placeholder={period}
                  className="w-1/4 mr-5"
                />
                <Input type="text" placeholder={contents} className="w-full" />
              </div>
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