import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import CategorySelector from "@/components/letter/categoryselect"
import { useLetter } from "@/components/letter/lettercontext"
import { LetterContent } from "@/types/letter"

interface ContentFormProps {
  content: LetterContent
  key: number
}

export default function ContentForm({ key, content }: ContentFormProps) {
  const { category, text } = content
  const { letterBody, setLetterBody } = useLetter()

  return (
    <>
      <div className="my-2 ml-20 flex w-full">
        <div className="flex items-center">
          <Label className="text-1xl mr-3 font-bold">카테고리</Label>
        </div>
        <CategorySelector
          value={category}
          onValueChange={(value) => {
            if (letterBody && letterBody.content) {
              const newContent = letterBody.content.map((c, i) => {
                if (i === key) {
                  return { ...c, category: value }
                }
                return c
              })
              setLetterBody({ ...letterBody, content: newContent })
            }
          }}
        />
        <Button className="ml-4">생성</Button>
      </div>
      <div className="mb-4 ml-20 w-full">
        <div className="items-center">
          <Label className="text-1xl hidden">자기소개서 생성</Label>
        </div>
        <div>
          <Textarea
            className="mt-2 w-2/3"
            value={text}
            onChange={(e) => {
              if (letterBody && letterBody.content) {
                const newContent = letterBody.content.map((c, i) => {
                  if (i === key) {
                    return { ...c, text: e.target.value }
                  }
                  return c
                })
                setLetterBody({ ...letterBody, content: newContent })
              }
            }}
          />
        </div>
      </div>
    </>
  )
}
