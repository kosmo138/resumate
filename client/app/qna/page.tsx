import HeadingText from "@/components/heading-text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RecruitMenu() {
  return (
    <main className="container flex flex-col py-8">
      <HeadingText subtext="레쥬메이트를 이용하시면서 궁금한 점을 질문해 주세요">
        Q&A
      </HeadingText>
      <section className="mt-6">
        <div className="flex flex-row space-x-4 text-lg">
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
  );
}
