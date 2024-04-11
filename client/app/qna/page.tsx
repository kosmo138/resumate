import HeadingText from "@/components/heading-text"
import { Mail } from "@/components/qna/mail"
import { mails } from "@/config/qna-content"
import Cookies from "js-cookie"

export default function RecruitMenu() {
  const layout = Cookies.get("react-resizable-panels:layout")

  const defaultLayout = layout ? JSON.parse(layout) : undefined
  return (
    <main className="container flex flex-col py-8">
      <HeadingText subtext="레쥬메이트를 이용하시면서 궁금한 점을 질문해 주세요">
        Q&A
      </HeadingText>
      <Mail mails={mails} defaultLayout={defaultLayout} />
    </main>
  )
}
