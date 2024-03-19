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
    <div>
      <div className="flex items-center">
        <label className="mr-5">{title}</label>
        <div>
          <span className="mr-5">{contentdate}</span>
          <div className="flex items-center">
            <Input type="text" placeholder={period} className="mr-10" />
            <Input type="text" placeholder={contents} />
          </div>
        </div>
      </div>

      {[...Array(formCount - 1)].map((_, index) => (
        <div key={index} className="flex items-center mt-4">
          <div>
            <span className="mr-5">{contentdate}</span>
            <div className="flex items-center">
              <Input type="text" placeholder={period} className="mr-10" />
              <Input type="text" placeholder={contents} />
            </div>
          </div>
        </div>
      ))}

      <button onClick={handleAddForm} className="mt-4">
        추가
      </button>
    </div>
  );
}
