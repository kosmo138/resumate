import { Textarea } from "@/components/ui/textarea";

export function ResumeInputWideForm({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="justify-start w-full my-3">
      <div className="mb-5">
        <label className="mr-5 flex-shrink-0 text-2xl font-bold">{title}</label>
      </div>
      <Textarea placeholder={content} className="pt-12 my-5 ml-10 h-40" />
    </div>
  );
}
