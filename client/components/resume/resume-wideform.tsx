import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
        <Label className="mr-5 flex-shrink-0 text-2xl font-bold">{title}</Label>
      </div>
      <Textarea placeholder={content} className="pt-12 my-5 ml-10 h-40" />
    </div>
  );
}
