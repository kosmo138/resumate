"use client";

import { useState, useEffect } from "react";
import ChildComponent from "./child";
import { Button } from "@/components/ui/button";

function ParentComponent() {
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  useEffect(() => {
    console.log({ inputValue, inputValue2 });
  }, [inputValue, inputValue2]);

  // 자식 컴포넌트에서 전달된 값 처리
  const handleInputChange = (value: any) => {
    setInputValue(value);
  };

  const handleInputChange2 = (value2: any) => {
    setInputValue2(value2);
  };

  // 폼 제출 이벤트 핸들러
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 제출 동작 방지
    console.log({ inputValue, inputValue2 });
  };

  return (
    <div>
      <h2>Parent Component</h2>
      <form onSubmit={handleSubmit}>
        <ChildComponent
          onInputChange={handleInputChange}
          onInputChange2={handleInputChange2}
        />
        <Button type="submit">저장</Button>
      </form>

      <p>
        Received value from child: {inputValue},{inputValue2}
      </p>
    </div>
  );
}

export default ParentComponent;
