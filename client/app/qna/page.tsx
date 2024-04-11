import HeadingText from "@/components/heading-text"
import { Board } from "@/components/qna/board"
import { articles } from "@/config/qna-content"
import Cookies from "js-cookie"

export default function RecruitMenu() {
  const layout = Cookies.get("react-resizable-panels:layout")

  const defaultLayout = layout ? JSON.parse(layout) : undefined
  return (
    <main className="container flex flex-col py-8">
      <HeadingText subtext="레쥬메이트를 이용하시면서 궁금한 점을 질문해 주세요">
        Q&A
      </HeadingText>
      <Board articles={articles} defaultLayout={defaultLayout} />
    </main>
  )
}
