"use client"
import { useEffect } from "react"
import HeadingText from "@/components/heading-text"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ContentForm from "@/components/letter/contentform"
import { LetterBody, LetterContent } from "@/types/letter"
import { useLetter } from "@/components/letter/lettercontext"

export default function LetterEditor({ params }: { params: { id: string } }) {
  const mock_data: LetterBody = JSON.parse(`
  {
    "resume_id": 1,
    "title": "테스트 제목",
    "company": "테스트 회사명",
    "job": "테스트 직무",
    "content": [
      {
        "category": "성장과정",
        "text": "성장과정 내용"
      },
      {
        "category": "지원동기",
        "text": "지원동기 내용"
      },
      {
        "category": "성격의 장단점",
        "text": "성격의 장단점 내용"
      },
      {
        "category": "입사 후 포부",
        "text": "입사 후 포부 내용"
      }
    ]
  }
  `)

  const { letterBody, setLetterBody } = useLetter()

  useEffect(() => {
    setLetterBody(mock_data)
  }, [])

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
          return <ContentForm content={content} key={key} />
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
  )
}
