import { Separator } from "@/components/ui/separator"
import { Mail } from "@/config/qna-content"

interface MailDisplayProps {
  mail: Mail | null
}

export function MailDisplay({ mail }: MailDisplayProps) {

  return (
    <div className="flex h-full flex-col">
      {mail ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <div className="grid gap-1">
                <div className="line-clamp-1 text-2xl font-bold">{mail.subject}</div>
              </div>
            </div>
          </div>
          <div className="flex-1 whitespace-pre-wrap p-4 text-md">
            {mail.text}
          </div>
          <Separator className="mt-auto" />
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  )
}
