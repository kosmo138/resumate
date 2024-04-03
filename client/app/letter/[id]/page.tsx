import { baseUrl } from "@/config/metadata";
import { LetterBody } from "@/types/letter";
import { notFound } from "next/navigation";
import HeadingText from "@/components/heading-text";
import LetterForm from "@/components/letter/letterform";

export default async function LetterEditor(id: string) {
  /* GET 요청에 대한 응답이 없으면 404 오류 페이지를 표시합니다 */
  /*
  const response = await fetch(`${baseUrl}/api/letter/${id}`)
    .then((res) => res.json())
    .catch(() => notFound())
  const letterBody: LetterBody = response.parse()
  */
  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="자기소개서 생성에 필요한 최소의 정보를 입력해 주세요">
        자기소개서 수정
      </HeadingText>
      {/*<LetterForm letter={letterBody} />*/}
    </main>
  );
}
