import { Textarea } from "@/components/ui/textarea";

export function LetterTextarea({ content }: { content: string }) {
  return (
    <Textarea
      placeholder={content}
      className="my-5 ml-10 h-40 text-left pt-7"
    />
  );
}