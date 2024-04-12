"use client"
import { useEffect, useState } from "react"
import HeadingText from "@/components/heading-text"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ContentForm from "@/components/letter/contentform"
import { LetterBody, LetterContent } from "@/types/letter"
import Cookies from "js-cookie"
import LetterError from "@/components/letter/letter-error-modal"

export default function LetterEditor({ params }: { params: { id: string } }) {
  // 필요한 변수 및 상태 선언
  const apiUrl = `/api/letter/${params.id}`;
  const jwt = Cookies.get("authorization");
  // 이전 상태 저장 변수
  const [prevLetterBody, setPrevLetterBody] = useState<LetterBody | null>(null);
  // useState 초기화
  const [letterBody, setLetterBody] = useState<LetterBody>({
    resume_id: 0,
    title: "",
    company: "",
    job: "",
    content: [{ category: "", text: "" }],
  });
  // 카테고리 텍스트에어리어 추가함수
  const handleAddContent = () => {
    setLetterBody({
      ...letterBody,
      content: [
        ...letterBody.content,
        { category: "", text: "" } // new content 추가
      ]
    });
  };
  // 카테고리 텍스트에어리어 삭제함수
  const handleRemoveContent = (key: number) => {
    if (letterBody.content.length > 1) {
      const newContent = [...letterBody.content];
      newContent.splice(key, 1); // 해당 인덱스의 content 제거
      setPrevLetterBody(letterBody); // 삭제 전 상태 저장
      setLetterBody({ ...letterBody, content: newContent });
    } else {
      setPrevLetterBody(letterBody); // 삭제 전 상태 저장
      // 카테고리 텍스트 에어리어를 1개로 초기화
      setLetterBody({
        ...letterBody,
        content: [{ category: "", text: "" }],
      });
    }
  };

  // 삭제 가능 여부 확인 함수
  const canRemoveContent = () => {
    return letterBody.content.length > 1; // content가 1개 이상일 때 삭제 가능
  };

  // 페이지가 로드될 때마다 이력서 정보를 가져옴
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
        // setErrorPageOpen(true);
      });
  }, [apiUrl]); // apiUrl 경로 변경될 때마다 useEffect 재실행

  // 확인 버튼 클릭 시 이전 상태로 되돌리기
  const handleConfirm = () => {
    if (prevLetterBody) {
      setLetterBody(prevLetterBody);
      setPrevLetterBody(null);
    }
  };
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
            value={letterBody.title}
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
              value={letterBody.job}
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
              value={letterBody.company}
              onChange={(e) => {
                if (letterBody) {
                  setLetterBody({ ...letterBody, company: e.target.value })
                }
              }}
            />
          </div>
        </div>
        {/* 컴포넌트 렌더링 */}
        {letterBody.content.map((content, index) => (
        <ContentForm
          key={index}
          content={content}
          letterBody={letterBody}
          setLetterBody={setLetterBody}
          onRemove={handleRemoveContent} // 삭제 함수 전달
        />
      ))}
        {!letterBody && (
          <div className="text-2xl font-bold">로딩 중입니다...</div>
        )}
        
        {/* 추가 및 삭제 버튼 */}
        <div className="ml-20 w-full">
          <div>
            <Button 
              variant="outline"
              className="mr-2"
              onClick={() => {
                if (canRemoveContent()) {
                  handleRemoveContent(letterBody.content.length - 1);
                } else {
                  <LetterError error={prevLetterBody !== null} onConfirm={handleConfirm} />
                }
              }}
            >삭제</Button>
            <Button onClick={handleAddContent}>추가</Button>
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

