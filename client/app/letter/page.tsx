import HeadingText from "@/components/heading-text"
import LetterCard from "@/components/letter/lettercard"
import { LetterHead } from "@/types/letter"
import Link from "next/link"

export default function LetterSelector() {
  const letterList: Array<LetterHead> = [
    {
      id: 1,
      title: "첫 번째 자기소개서",
      modified: "2024-03-01",
    },
    {
      id: 2,
      title: "두 번째 자기소개서",
      modified: "2024-03-02",
    },
    {
      id: 3,
      title: "세 번째 자기소개서",
      modified: "2024-03-03",
    },
    {
      id: 4,
      title: "네 번째 자기소개서",
      modified: "2024-03-04",
    },
  ]
  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="수정할 자기소개서를 선택해 주세요">
        자기소개서
      </HeadingText>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {letterList.map((letterHead, index) => (
          <Link href={`/letter/${letterHead.id}`} key={index}>
            <LetterCard letterHead={letterHead} />
          </Link>
        ))}
      </div>
    </main>
  )
}
