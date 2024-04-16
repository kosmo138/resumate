import React from "react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

export default function ResumeButton({ resumeId }: { resumeId: number }) {
  const letterData = {
    resume_id: resumeId,
    title: "새 자소서",
    company: "",
    job: "",
    content: [
      {
        category: "성장과정",
        text: "",
      },
      {
        category: "지원동기",
        text: "",
      },
      {
        category: "성격의 장단점",
        text: "",
      },
      {
        category: "입사 후 포부",
        text: "",
      },
    ],
  };

  const handleClick = () => {
    fetch(`/api/letter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("authorization")}`,
      },
      body: JSON.stringify(letterData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("자소서를 생성하지 못했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        const letterId = data.letterId;
        window.location.href = `/letter/${letterId}`;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Button className="ml-10 h-10 px-3 py-2" onClick={handleClick}>
      자기소개서 작성
    </Button>
  );
}
