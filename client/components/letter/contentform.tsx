import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import CategorySelector from "@/components/letter/categoryselect"
import { useLetter } from "@/components/letter/lettercontext"

interface ContentFormProps {
  key: number
}

export default function ContentForm({ key }: ContentFormProps) {
  const { letterBody, setLetterBody } = useLetter()
  const category =
    letterBody && letterBody.content && letterBody.content[key].category
  const text = letterBody && letterBody.content && letterBody.content[key].text
  const setCategory = (newCategory: string) => {
    if (letterBody && letterBody.content) {
      letterBody.content[key].category = newCategory
      setLetterBody(letterBody)
    }
  }
  const setText = (newText: string) => {
    if (letterBody && letterBody.content) {
      letterBody.content[key].text = newText
      setLetterBody(letterBody)
    }
  }

  return (
    <>
      <div className="my-2 ml-20 flex w-full">
        <div className="flex items-center">
          <Label className="text-1xl mr-3 font-bold">카테고리</Label>
        </div>
        <CategorySelector value={category} onValueChange={setCategory} />
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
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </>
  )
}
