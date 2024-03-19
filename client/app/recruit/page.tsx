import HeadingText from "@/components/heading-text"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RecruitMenu() {
  return (
    <main className="container flex flex-col py-8">
      <HeadingText subtext="워크넷 제공 구인 공고를 검색하실 수 있습니다">
        채용정보
      </HeadingText>
      <section className="mt-6">
        <div className="flex flex-row space-x-4 align-middle text-lg">
          <label htmlFor="title" className="pt-1 font-bold">
            제목
          </label>
          <Input
            id="title"
            type="text"
            placeholder="제목을 입력해 주세요"
            className="w-1/2 text-lg"
          />
          <Button className="align-middle">검색</Button>
        </div>
      </section>
    </main>
  )
}
