"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SaveButton() {
  const handleClick = () => {
    alert("저장 버튼이 클릭되었습니다.");
  };

  return (
    <div className="flex justify-end space-x-4 mt-5">
      <Link href="/resume">
        <Button variant="outline">취소</Button>
      </Link>
      <Button onClick={handleClick}>저장</Button>
    </div>
  );
}
