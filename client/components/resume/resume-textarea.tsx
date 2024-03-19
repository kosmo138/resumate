import { Textarea } from "@/components/ui/textarea";

export function ResumeTextarea({ content }: { content: string }) {
  return <Textarea placeholder={content} />;
}
