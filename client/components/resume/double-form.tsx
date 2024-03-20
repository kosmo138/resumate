"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";

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
    <div className="w-full my-3">
      <div>
        <div className="mb-5">
          <label className="mr-5 mb-1 text-2xl font-bold">{title}</label>
        </div>
        <div>
          <div className="flex items-center">
            <span className="mr-5 flex-shrink-0">{contentdate}</span>
            <Input type="text" placeholder={period} className="mr-10" />
            <Input type="text" placeholder={contents} />
          </div>
        </div>
      </div>

      {[...Array(formCount - 1)].map((_, index) => (
        <div key={index} className="flex items-center mt-4">
          <div className="w-4/5 my-3">
            <div className="flex items-center">
              <span className="mr-5 flex-shrink-0">{contentdate}</span>
              <Input
                type="text"
                placeholder={period}
                className="w-full mr-10"
              />{" "}
              {/* 인풋 박스의 너비를 100%로 설정 */}
              <Input
                type="text"
                placeholder={contents}
                className="w-full"
              />{" "}
              {/* 인풋 박스의 너비를 100%로 설정 */}
            </div>
          </div>
        </div>
      ))}

      <img
        src="/plus-button.svg"
        onClick={handleAddForm}
        className="mt-4"
      ></img>
    </div>
  );
}
