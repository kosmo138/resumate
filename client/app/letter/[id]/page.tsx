import { baseUrl } from "@/config/metadata"
import { LetterBody } from "@/types/letter"
import { notFound } from "next/navigation"
import HeadingText from "@/components/heading-text"
import LetterForm from "@/components/letter/letterform"
import SaveButton from "@/components/letter/button";
import { LetterInputForm } from "@/components/letter/letter-form";
import { DoubleForm } from "@/components/letter/double-form";
import { LetterTextarea } from "@/components/letter/letter-textarea";
import { LetterInputWideForm } from "@/components/letter/letter-wideform";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default async function LetterEditor(id: string) {
  /* GET 요청에 대한 응답이 없으면 404 오류 페이지를 표시합니다 */
  // const response = await fetch(`${baseUrl}/api/letter/${id}`)
  //   .then((res) => res.json())
  //   .catch(() => notFound())
  // const letterBody: LetterBody = response.parse()
  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="자기소개서 생성에 필요한 최소의 정보를 입력해 주세요">
        자기소개서 수정
      </HeadingText>
      {/*<LetterForm letter={letterBody} />*/}

      <div className="ml-20 my-3 w-full flex">
        <div className="flex items-center">
          <Label className="text-2xl font-bold">제목</Label>
        </div>
        <Input className="ml-7 w-5/6 border-transparent" placeholder="자기소개서 생성에 필요한 제목을 입력해주세요."></Input>
      </div>

      <div className="ml-20 my-3 w-full flex">
        <div className="flex items-center">
          <Label className="text-1xl font-bold">지원회사</Label>
        </div>
        <Input className="ml-2 w-2/5 mr-4" placeholder="지원 회사명 입력"></Input>
        <div className="flex items-center">
          <Label className="text-1xl font-bold">직무</Label>
        </div>
        <Input className="ml-2 w-2/5" placeholder="직무명 입력"></Input>
      </div>


      <div className="ml-20 my-3 w-full flex">
        <div className="flex items-center">
          <Label className="text-1xl font-bold">카테고리</Label>
        </div>
        <Input className="ml-2 w-1/5 mr-4" placeholder="드롭박스 미구현"></Input>
        <div className="flex items-center">
          <Label className="text-1xl font-bold">키워드</Label>
        </div>
        <Input className="ml-2 w-1/5" placeholder="직무명 입력"></Input>
      </div>
        <div className="w-2/5">
          <Label className="text-left">•설명 : 자기소개서에 넣고싶은 키워드를 입력하세요.</Label>
        </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="ml-20 my-3 w-full">
        <div className="items-center">
          <Label className="text-1xl">자기소개서 생성란</Label>
        </div>
        <Textarea></Textarea>
      </div>
      <div className="ml-20 w-full">
        <div>
          <Button className="mr-2">삭제</Button>
          <Button>추가</Button>
        </div>
          <Button>생성하기</Button>
      </div>  

    </main>
  )
}
