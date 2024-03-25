import { baseUrl } from "@/config/metadata";
import { ResumeBody } from "@/types/resume";
import { notFound } from "next/navigation";
import HeadingText from "@/components/heading-text";
import ResumeForm from "@/components/resume/resumeform";
import SaveButton from "@/components/resume/button";
import { ResumeInputForm } from "@/components/resume/resume-form";
import { DoubleForm } from "@/components/resume/double-form";
import { ResumeTextarea } from "@/components/resume/resume-textarea";
import { ResumeInputWideForm } from "@/components/resume/resume-wideform";
import { resumeContents } from "@/config/resume-id-contents";

export default async function ResumeEditor(id: string) {
  /* GET 요청에 대한 응답이 없으면 404 오류 페이지를 표시합니다 */
  /*const response = await fetch(`${baseUrl}/api/resume/${id}`)
    .then((res) => res.json())
    .catch(() => notFound());
  const resumeBody: ResumeBody = response.parse();
  */
  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="자기소개서 생성에 필요한 최소의 정보를 입력해 주세요.">
        이력서
      </HeadingText>
      {/*     <ResumeForm resume={resumeBody} /> */}
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full"
      ></div>
      <ResumeInputForm
        title={resumeContents.title}
        content={resumeContents.titleContent}
      />
      <DoubleForm
        title={resumeContents.career.title}
        contentdate={resumeContents.career.contentDate}
        period={resumeContents.career.period}
        contents={resumeContents.career.contents}
        count={resumeContents.career.count}
      />
      <ResumeTextarea content={resumeContents.textareaContent} />
      <DoubleForm
        title={resumeContents.education.title}
        contentdate={resumeContents.education.contentDate}
        period={resumeContents.education.period}
        contents={resumeContents.education.contents}
        count={resumeContents.education.count}
      />
      <ResumeInputWideForm
        title={resumeContents.skill.title}
        content={resumeContents.skill.content}
      />
      <DoubleForm
        title={resumeContents.award.title}
        contentdate={resumeContents.award.contentDate}
        period={resumeContents.award.period}
        contents={resumeContents.award.contents}
        count={resumeContents.award.count}
      />
      <ResumeInputWideForm
        title={resumeContents.language.title}
        content={resumeContents.language.content}
      />
      <SaveButton />
    </main>
  );
}
