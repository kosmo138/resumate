"use client";

import { useEffect, useState } from "react";
import HeadingText from "@/components/heading-text";
import LetterCard from "@/components/letter/lettercard";
import UnauthorizedDialog from "@/components/auth/unauthorized-dialog";
import { LetterHead } from "@/types/letter";
import Cookies from "js-cookie";
import LetterAddButton from "@/components/letter/letteraddbutton";

export default function LetterSelector() {
  const [letterList, setLetterList] = useState<Array<LetterHead>>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchLetterList = () => {
      fetch("/api/letter", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("authorization")}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            setIsError(true);
          }
        })
        .then((data) => {
          setLetterList(data);
        });
    };
    fetchLetterList();
  }, []);

  // UNIX 타임스탬프를 YYYY-MM-DD 형식으로 변환하는 함수
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // UNIX 타임스탬프(ms)를 받습니다.
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="수정할 자소서를 선택해 주세요">자소서</HeadingText>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isError && <UnauthorizedDialog />}

        {!isError &&
          letterList.map((letterHead, index) => (
            // 아이디 생성값
            <LetterCard
              key={index}
              id={letterHead.id}
              title={letterHead.title}
              modified={
                typeof letterHead.modified === "number"
                  ? formatDate(letterHead.modified)
                  : letterHead.modified
              } // 코드의 유연성을 높이기 위해 조건 연산자를 사용하여 모든 상황을 고려하여 처리.
            />
          ))}
      </div>
    </main>
  );
}
