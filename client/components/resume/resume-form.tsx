import { Input } from "@/components/ui/input";

export function ResumeInputForm({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div>
      <label>{title}</label>
      <Input type="text" placeholder={content} />
    </div>
  );
}
