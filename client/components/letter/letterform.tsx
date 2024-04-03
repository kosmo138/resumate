import { LetterBody } from "@/types/letter";

export default function LetterForm({ letter }: { letter: LetterBody }) {
  return (
    <>
      <ul>
        <li>제목: {letter.title}</li>
        <li>수정일: {letter.modified}</li>
      </ul>
    </>
  );
}
