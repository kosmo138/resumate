import { LetterBody } from "@/types/letter"

export default function LetterForm({ letter }: { letter: LetterBody }) {
  return (
    <>
      <ul>
        <li>제목: {letter.title}</li>
      </ul>
    </>
  )
}
