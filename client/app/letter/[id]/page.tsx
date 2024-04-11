"use client"
import { useEffect, useState } from "react"
import HeadingText from "@/components/heading-text"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ContentForm from "@/components/letter/contentform"
import { LetterBody, LetterContent } from "@/types/letter"
import Cookies from "js-cookie"

export default function LetterEditor({ params }: { params: { id: string } }) {
  // const mock_data: LetterBody = JSON.parse(`
  // {
  //   "resume_id": 1,
  //   "title": "테스트 제목",
  //   "company": "테스트 회사명",
  //   "job": "테스트 직무",
  //   "content": [
  //     {
  //       "category": "성장과정",
  //       "text": "성장과정 내용"
  //     },
  //     {
  //       "category": "지원동기",
  //       "text": "지원동기 내용"
  //     },
  //     {
  //       "category": "성격의 장단점",
  //       "text": "성격의 장단점 내용"
  //     },
  //     {
  //       "category": "입사 후 포부",
  //       "text": "입사 후 포부 내용"
  //     }
  //   ]
  // }
  // `)
  const apiUrl = `/api/letter/${params.id}`;
  const jwt = Cookies.get("authorization");
  const [errorPageOpen, setErrorPageOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [saveError, setSaveError] = useState(false);

  
  const [letterBody, setLetterBody] = useState<LetterBody>({
    resume_id: 1,
    title: "",
    company: "",
    job: "",
    content: [{ category: "", text: "" }],
  });

  useEffect(() => {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("오류가 발생했습니다.");
        }
        return response.json();
      })
      .then((data) => setLetterBody(data))
      .catch(() => {
        // 브라우저 통해 권한없는 이력서 경로로 접속시 모달창 활성화
        setErrorPageOpen(true);
      });
  }, [apiUrl]); // 웹 경로 변경될 때마다 useEffect 재실행

  const handleInputChange = (key: string, value: string) => {
    setLetterBody({ ...letterBody, [key]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const filteredFormData = {
      ...letterBody,
      // 제목란 공백으로 수정할 경우 모달창 조건부 랜더링
      title: letterBody.title === "" ? setIsError(true) : letterBody.title,
      careerData: letterBody.content.filter(
        (value, index) =>
          index === 0 || value.category.trim() !== "" || value.text.trim() !== ""
      ),
    };  
  }  

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="작성된 이력서를 토대로 자기소개서를 작성합니다">
        자기소개서
      </HeadingText>

      <div className="my-3 ml-20 flex w-full">
        <div className="flex items-center">
          <Label className="text-2xl font-bold">제목</Label>
        </div>
        <Input
          className="ml-7 w-5/6 border-transparent"
          placeholder="자기소개서 생성에 필요한 제목을 입력해주세요."
          value={letterBody?.title}
          onChange={(e) => {
            if (letterBody) {
              setLetterBody({ ...letterBody, title: e.target.value })
            }
          }}
        ></Input>
      </div>

      <div className="my-3 ml-20 flex w-full flex-col">
        <div className="mb-6 flex flex-row items-center">
          <Label className="text-1xl font-bold">직무</Label>
          <Input
            className="ml-2 w-2/5"
            placeholder="직무명 입력"
            value={letterBody?.job}
            onChange={(e) => {
              if (letterBody) {
                setLetterBody({ ...letterBody, job: e.target.value })
              }
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-1xl font-bold">지원회사</Label>
          <Input
            className="ml-2 mr-4 w-2/5"
            placeholder="지원 회사명 입력"
            value={letterBody?.company}
            onChange={(e) => {
              if (letterBody) {
                setLetterBody({ ...letterBody, company: e.target.value })
              }
            }}
          />
        </div>
      </div>
      {letterBody &&
        letterBody.content &&
        letterBody.content.map((content: LetterContent, key: number) => {
          return (
            <ContentForm
              content={content}
              key={key}
              letterBody={letterBody}
              setLetterBody={setLetterBody}
            />
          )
        })}
      {!letterBody && (
        <div className="text-2xl font-bold">로딩 중입니다...</div>
      )}
      <div className="ml-20 w-full">
        <div>
          <Button variant="outline" className="mr-2">
            삭제
          </Button>
          <Button>추가</Button>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => console.log(JSON.stringify(letterBody))}>
            저장
          </Button>
        </div>
      </div>
    </main>
  );
}
// axjax fatch axiox.get.post
// axjax fatch axiox.get.post
