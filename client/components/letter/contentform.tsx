import CategorySelector from "@/components/letter/categoryselect";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LetterBody, LetterContent } from "@/types/letter";
import { Input } from "../ui/input";
import Cookies from "js-cookie";

// ContentFormProps 인터페이스 정의
interface ContentFormProps {
  indexkey: number;
  content: LetterContent;
  letterBody: LetterBody;
  setLetterBody: (letterBody: LetterBody) => void;
  onRemove: (indexkey: number) => void;
  onCategoryChange: (indexkey: number, category: string) => void;
}

// ContentForm 컴포넌트 정의
export default function ContentForm({ indexkey, content, letterBody, setLetterBody, onCategoryChange }: ContentFormProps) {
  // API 엔드포인트 URL
  const apiUrl = `/data/letter`;
  // JWT 토큰
  const jwt = Cookies.get("authorization");
  // 카테고리 변경 핸들러
  const handleCategoryChange = (value: string) => {
    onCategoryChange(indexkey, value); // 선택된 값을 부모 컴포넌트로 전달
  };
  // 저장 버튼 클릭 시 실행되는 함수
  const handleCreate = () => {
    const body_json = JSON.stringify({
      resume_id: letterBody.resume_id,
      company: letterBody.company,
      job: letterBody.job,
      category: content.category,
      text: content.text,
      command: content.command || "",
    });
    // API를 통해 데이터를 서버로 전송하는 함수
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: body_json, // 텍스트박스 내의 값 전체를 전송
    })
      .then((response) => {
        if (!response.ok) {
          alert("생성에 실패했습니다.");
        } else {
          response.text().then((data) => {
            setLetterBody({
              ...letterBody,
              content: [
                ...letterBody.content.slice(0, indexkey), // 이전 요소들을 그대로 유지
                { ...content, text: data }, // 현재 요소 업데이트
                ...letterBody.content.slice(indexkey + 1), // 나머지 요소들을 그대로 유지
              ]
            });
          });
        }
      })
      .catch(() => {
      });
  };


  return (
    <>
        <div className=" my-2 ml-20 flex w-full">
          {/* 카테고리 선택란 */}
          <div className=" flex items-center">
            <Label className="text-1xl mr-3 font-bold">카테고리</Label>
          </div>
          <CategorySelector
            value={content.category}
            onValueChange={handleCategoryChange}
          />
          <Button onClick={handleCreate} className="ml-4">생성</Button>
        </div>
      {/* 텍스트 입력란 */}
      <div className="mb-4 ml-20 w-full">
        <div>
          <Textarea
            className="mt-2 w-2/3"
            value={content.text}
            onChange={(e) =>
              setLetterBody({
                ...letterBody,
                content: [
                  ...letterBody.content.slice(0, indexkey), // 이전 요소들을 그대로 유지
                  { ...content, text: e.target.value }, // 현재 요소 업데이트
                  ...letterBody.content.slice(indexkey + 1), // 나머지 요소들을 그대로 유지
                ],
              })
            }
          />
        </div>
        <div className="mt-3 mb-6 flex flex-row items-center">
          <Input
            className="w-2/5"
            placeholder="추가 요구사항 입력"
            value={content.command}
            onChange={(e) =>
              setLetterBody({
                ...letterBody,
                content: [
                  ...letterBody.content.slice(0, indexkey), // 이전 요소들을 그대로 유지
                  { ...content, command: e.target.value }, // 현재 요소 업데이트
                  ...letterBody.content.slice(indexkey + 1), // 나머지 요소들을 그대로 유지
                ],
              })
            }
          />
        </div>
      </div>

    </>
  );
}