import { Input } from "@/components/ui/input";

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
      <Input
        type="text"
        placeholder={content}
        className="w-full h-40 whitespace-normal"
      />
    </div>
  );
}
