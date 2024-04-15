"use client"
import { useEffect, useState } from "react"
import HeadingText from "@/components/heading-text"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ContentForm from "@/components/letter/contentform"
import { LetterBody } from "@/types/letter"
import Cookies from "js-cookie"
import LetterSubmitButton from "@/components/letter/letter-submit-button"
import { Dialog, DialogClose, DialogContent, DialogFooter } from "@/components/ui/dialog"


export default function LetterEditor({ params }: { params: { id: string } }) {
  // 필요한 변수 및 상태 선언
  const apiUrl = `/api/letter/${params.id}`;
  const jwt = Cookies.get("authorization");
  // 이력서 제목이 없을 경우에 모달창 조건부 랜더링
  const [isError, setIsError] = useState(false);
  // 자소서 저장이 무언가로 인해 오류가 발생겼을경우 모달창 조건부 랜더링
  const [saveError, setSaveError] = useState(false);
  // 모달 여닫는 랜더링
  const [openDialog, closeDialog] = useState(false);
  // 동적으로 변하는 letter 데이터를 useState로 관리하기 위해 letterBody초기화
  const [letterBody, setLetterBody] = useState<LetterBody>({
    resume_id: 0,
    title: "",
    company: "",
    job: "",
    content: [{ category: "", text: "", command:"" }],
  });

  // content 추가함수
  const handleAddContent = () => {
    setLetterBody({
      ...letterBody,
      content: [
        ...letterBody.content,
        { category: "", text: "", command:""  } // new content 추가
      ]
    });
  };

  // content 삭제함수
  const handleRemoveContent = (indexkey: number) => {
    const newContent = [...letterBody.content];
    newContent.splice(indexkey, 1); // 해당 인덱스의 content 제거
    setLetterBody({ ...letterBody, content: newContent });
  };

  // content 삭제 가능 여부 확인 함수
  const canRemoveContent = () => {
    const isRemovable = letterBody.content.length > 1
    if (!isRemovable) {
      closeDialog(true)
    }
    return isRemovable // content가 1개 이상일 때 삭제 가능
  };

  const exitDialog = () => {
    closeDialog(false)
  }

  const onCategoryChange = (indexkey: number, value: string) => {
    const newContent = [...letterBody.content];
    newContent[indexkey] = { ...newContent[indexkey], category: value };
    setLetterBody({ ...letterBody, content: newContent });
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
        // 임의의 사유로 모달창 에러 발생시
        setSaveError(true);
      });
  }, [apiUrl]); // apiUrl 경로 변경될 때마다 useEffect 재실행

  // 폼 제출 이벤트 핸들러
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // '2번째 목록 이후'로 공백(입력을 아무것도 하지 않은)을 제외한 데이터만 필터링해서 저장하기 위함
    // formdata를 저장할 때 아무것도 입력하지 않은 공백란은 저장하지 않으려고 trim 함수 사용
    // ex) 2번째 경력란에 날짜와 컨텐츠에 "  " 처럼 공백만 있을 경우 DB에 전달하지 않기 위함
    const filteredletterBody = {
      ...letterBody,
      // 제목란 공백으로 수정할 경우 모달창 조건부 랜더링
      title: letterBody.title === "" ? setIsError(true) : letterBody.title,
    };
      console.log(filteredletterBody);
   // API를 통해 데이터를 서버로 전송하는 함수
    fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(filteredletterBody), // 텍스트박스 내의 값 전체를 전송
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("저장에 실패했습니다.");
        }
        return response.json();
      })
      .catch(() => {
        // 임의의 사유로 모달창 에러 발생시
        setSaveError(true);
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
        {letterBody.content.map((content, indexkey) => (
        <ContentForm
          indexkey={indexkey}
          content={content}
          letterBody={letterBody}
          setLetterBody={setLetterBody} // setLetterBody 함수를 props로 전달
          onRemove={handleRemoveContent} // 삭제 함수 전달
          onCategoryChange={onCategoryChange}
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
                }
              }}
            >삭제</Button>
            <Button onClick={handleAddContent}>추가</Button>
          </div>
        </div>
        <div>
          <Dialog open={openDialog}>
              <DialogContent>
                <DialogClose onClick={exitDialog}/>
                  <p>더 이상 삭제할 수 없습니다</p>
                <DialogFooter>
                  <Button onClick={exitDialog}>확인</Button>
                </DialogFooter>
              </DialogContent>
          </Dialog>
          <div className="mt-4 w-full">
            <form className="w-full" onSubmit={handleSubmit}>
              <LetterSubmitButton isError={isError} saveError={saveError} />
            </form>
          </div>
        </div>
      </main>
    );
  }