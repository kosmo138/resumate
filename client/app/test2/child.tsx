"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ChildComponent({
  onInputChange,
  onInputChange2,
}: {
  onInputChange: any;
  onInputChange2: any;
}) {
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const handleChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
    // 입력 값 부모 컴포넌트로 전달
    onInputChange(value);
  };

  const handleChange2 = (e: any) => {
    const value = e.target.value;
    setInputValue2(value);
    // 입력 값 부모 컴포넌트로 전달
    onInputChange2(value);
  };

  return (
    <div>
      <h3>Child Component</h3>
      <Input
        type="text"
        value={inputValue}
        placeholder="Type something..."
        onChange={handleChange}
      />
      <Input
        type="text"
        value={inputValue2}
        placeholder="Type something..."
        onChange={handleChange2}
      />
    </div>
  );
}

export default ChildComponent;
