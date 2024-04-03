import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ResumeInputForm({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="flex w-full my-3 mt-10">
      <Label className="mr-5 pt-0 mt-0 flex-shrink-0 text-2xl font-bold">
        {title}
      </Label>
      <Input type="text" placeholder={content} className="w-3/5 border-none" />
    </div>
  );
}
