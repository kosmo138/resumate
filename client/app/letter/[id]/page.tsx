"use client"
import * as React from "react"
import { baseUrl } from "@/config/metadata"
import { LetterBody } from "@/types/letter"
import { notFound } from "next/navigation"
import HeadingText from "@/components/heading-text"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default async function LetterEditor(id: string) {
  const [position, setPosition] = React.useState("bottom")
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
          <Label className="text-1xl font-bold mr-3">카테고리</Label>
        </div>
        <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="성장과정">성장과정</SelectItem>
          <SelectItem value="지원동기">지원동기</SelectItem>
          <SelectItem value="성격의 장단점">성격의 장단점</SelectItem>
          <SelectItem value="입사 후 포부">입사 후 포부</SelectItem>
          <SelectItem value="기업 이해 및 분석">기업 이해 및 분석</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        <div className="flex items-center">
          <Label className="ml-3 text-1xl font-bold">키워드</Label>
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
          <Button variant="outline" className="mr-2">삭제</Button>
          <Button>추가</Button>
        </div>
          <Button variant="outline" className="text-black border-black bg-white">생성하기</Button>
      </div>  

    </main>
  );
}
