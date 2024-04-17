"use client";
import { useEffect, useState } from "react";
import HeadingText from "@/components/heading-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ContentForm from "@/components/letter/contentform";
import { LetterBody, LetterContent } from "@/types/letter";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function LetterEditor({ params }: { params: { id: string } }) {
  // 필요한 변수 및 상태 선언
  const apiUrl = `/api/letter/${params.id}`;
  const jwt = Cookies.get("authorization");
  const [openDialog, closeDialog] = useState(false);

  // 동적으로 변하는 letter 데이터를 useState로 관리하기 위해 letterBody초기화
  const [letterForm, setLetterBody] = useState<LetterBody>({
    resume_id: 0,
    title: "",
    company: "",
    job: "",
    content: [{ category: "", text: "" }],
  });

  // content 삭제함수
  const handleRemoveContent = (indexkey: number) => {
    const newContent = [...letterForm.content];
    newContent.splice(indexkey, 1); // 해당 인덱스의 content 제거
    setLetterBody({ ...letterForm, content: newContent });
  };

  // content 삭제 가능 여부 확인 함수
  const canRemoveContent = () => {
    const isRemovable = letterForm.content.length > 1; // content가 1개 이상일 때 삭제 가능
    if (!isRemovable) {
      closeDialog(true); // content가 1개 이하일 때 다이얼로그를 열도록 상태 업데이트
    }
    return isRemovable;
  };

  // content 추가함수
  const handleAddContent = () => {
    setLetterBody({
      ...letterForm,
      content: [
        ...letterForm.content,
        { category: "", text: "" }, // new content 추가
      ],
    });
  };

  const exitDialog = () => {
    console.log(letterForm.content.length);
    closeDialog(false);
  };

  const onCategoryChange = (indexkey: number, value: string) => {
    const newContent = [...letterForm.content];
    newContent[indexkey] = { ...newContent[indexkey], category: value };
    setLetterBody({ ...letterForm, content: newContent });
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
      .catch(() => {});
  }, [apiUrl]); // apiUrl 경로 변경될 때마다 useEffect 재실행

  // API를 통해 데이터를 서버로 전송하는 함수
  const handleSave = () => {
    console.log(letterForm);

    fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(letterForm), // 텍스트박스 내의 값 전체를 전송
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("저장에 실패했습니다.");
        }
        return response.json();
      })
      .catch(() => {
        // 임의의 사유로 모달창 에러 발생시
        // setSaveError(true);
      });
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
          value={letterForm.title}
          onChange={(e) => {
            if (letterForm) {
              setLetterBody({ ...letterForm, title: e.target.value });
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
            value={letterForm.job}
            onChange={(e) => {
              if (letterForm) {
                setLetterBody({ ...letterForm, job: e.target.value });
              }
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-1xl font-bold">지원회사</Label>
          <Input
            className="ml-2 mr-4 w-2/5"
            placeholder="지원 회사명 입력"
            value={letterForm.company}
            onChange={(e) => {
              if (letterForm) {
                setLetterBody({ ...letterForm, company: e.target.value });
              }
            }}
          />
        </div>
      </div>
      {/* 컴포넌트 렌더링 */}
      {letterForm.content.map((content, indexkey) => (
        <ContentForm
          indexkey={indexkey}
          content={content}
          letterBody={letterForm}
          setLetterBody={setLetterBody}
          onRemove={handleRemoveContent} // 삭제 함수 전달
          onCategoryChange={onCategoryChange}
        />
      ))}
      {!letterForm && (
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
                handleRemoveContent(letterForm.content.length - 1);
              }
            }}
          >
            삭제
          </Button>
          <Button onClick={handleAddContent}>추가</Button>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={handleSave}>저장</Button>
        </div>
        <div>
          <Dialog open={openDialog}>
            {/* dialog 열렸을시 내용 */}
            <DialogContent>
              <DialogClose onClick={exitDialog} />
              <p>카테고리와 세부내용은 최소 1개 이상 유지해야 합니다.</p>
              <DialogFooter>
                <Button
                  variant="default"
                  className="w-full"
                  onClick={exitDialog}
                >
                  확인
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}
