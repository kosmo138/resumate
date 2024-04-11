<<<<<<< HEAD
"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import HeadingText from "@/components/heading-text"
import ResumeAddButton from "@/components/resume/resumeaddbutton"
import ResumeCard from "@/components/resume/resumecard"
import { ResumeHead } from "@/types/resume"
import UnauthorizedDialog from "@/components/auth/unauthorized-dialog"

export default function ResumeSelector() {
  const [resumeList, setResumeList] = useState<Array<ResumeHead>>([])
  const [isError, setIsError] = useState<boolean>(false)
=======
"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import HeadingText from "@/components/heading-text";
import ResumeAddButton from "@/components/resume/resumeaddbutton";
import ResumeCard from "@/components/resume/resumecard";
import { ResumeHead } from "@/types/resume";
import UnauthorizedDialog from "@/components/auth/unauthorized-dialog";

export default function ResumeSelector() {
  const [resumeList, setResumeList] = useState<Array<ResumeHead>>([]);
  const [isError, setIsError] = useState<boolean>(false);
>>>>>>> origin/dev

  useEffect(() => {
    const fetchResumeList = () => {
      fetch("/api/resume", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("authorization")}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
<<<<<<< HEAD
            return response.json()
          } else {
            setIsError(true)
          }
        })
        .then((data) => {
          setResumeList(data)
        })
    }
    fetchResumeList()
  }, [])

  // UNIX 타임스탬프를 YYYY-MM-DD 형식으로 변환하는 함수
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000) // UNIX 타임스탬프(ms)를 받습니다.
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    return `${year}-${month}-${day}`
  }
=======
            return response.json();
          } else {
            setIsError(true);
          }
        })
        .then((data) => {
          setResumeList(data);
        });
    };
    fetchResumeList();
  }, []);

  // UNIX 타임스탬프를 YYYY-MM-DD 형식으로 변환하는 함수
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // UNIX 타임스탬프(ms)를 받습니다.
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
>>>>>>> origin/dev

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="수정할 이력서를 선택해 주세요">이력서</HeadingText>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ResumeAddButton setResumeList={setResumeList} />
        {isError && <UnauthorizedDialog />}

        {!isError &&
          resumeList.map((resumeHead, index) => (
            // 아이디 생성값
            <ResumeCard
              key={index}
              id={resumeHead.id}
              title={resumeHead.title}
              modified={
                typeof resumeHead.modified === "number"
                  ? formatDate(resumeHead.modified)
                  : resumeHead.modified
              } // 코드의 유연성을 높이기 위해 조건 연산자를 사용하여 모든 상황을 고려하여 처리.
            />
          ))}
      </div>
    </main>
  );
}
