import { Input } from "@/components/ui/input";

export function ResumeInputForm({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="flex justify-start w-full my-3">
      <label className="mr-5 pt-0 mt-0 flex-shrink-0 text-2xl font-bold">
        {title}
      </label>
      <Input type="text" placeholder={content} className="w-full border-none" />
    </div>
  );
}
