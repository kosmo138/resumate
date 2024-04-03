import React from "react";
import { Textarea } from "@/components/ui/textarea";

export function ResumeTextarea({ content }: { content: string }) {
  return (
    <div className="justify-start w-full my-3">
      <Textarea placeholder={content} className="pt-7 my-5 ml-10 h-40" />
    </div>
  );
}
