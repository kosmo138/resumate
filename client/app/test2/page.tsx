"use client";

import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function FormExample() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    anything: "",
  });

  // 폼 입력값 변경 시 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 폼 제출 시 데이터 출력
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("폼 데이터:", formData);
  };

  return (
    <div>
      <h1>폼 예시</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Label>
            이름:
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Label>
        </div>
        <div>
          <Label>
            이메일:
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Label>
        </div>
        <div>
          <Label>
            하고싶은말:
            <Textarea
              name="anything"
              value={formData.anything}
              onChange={handleChange}
            />
          </Label>
        </div>
        <Button type="submit">제출</Button>
      </form>
    </div>
  );
}
