import HeadingText from "@/components/heading-text"
import ResumeCard from "@/components/resume/ResumeCard"

export default function ResumeList() {
  return (
    <main className="container flex flex-col items-center py-8">
      <div className="flex flex-col items-center space-y-2 text-center">
        <HeadingText subtext="생성할 이력서를 선택해 주세요">
          이력서
        </HeadingText>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ResumeCard title="첫 번째 이력서" date="2024-03-01" />
      </div>
    </main>
  )
}
