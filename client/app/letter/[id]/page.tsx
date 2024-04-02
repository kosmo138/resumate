"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { LetterBody } from "@/types/letter";
import HeadingText from "@/components/heading-text";
import LetterForm from "@/components/letter/letterform";

/** @see https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes */
export default function LetterEditor({ params }: { params: { id: string } }) {
  const [letterBody, setLetterBody] = useState<LetterBody>({});

  useEffect(() => {
    const fetchLetter = () => {
      fetch(`/api/letter/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("authorization")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setLetterBody(data);
        })
        .catch((error) => console.error(error));
    };

    fetchLetter();
  }, [params.id]);

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="자기소개서 제목을 입력해 주세요">제목</HeadingText>
      <LetterForm letter={letterBody} />
    </main>
  );
}
