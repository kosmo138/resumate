import { Separator } from "@/components/ui/separator"
import { Article } from "@/config/qna-content"

interface ArticleDisplayProps {
  article: Article | null
}

export function ArticleDisplay({ article }: ArticleDisplayProps) {

  return (
    <div className="flex h-full flex-col">
      {article ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <div className="grid gap-1">
                <div className="line-clamp-1 text-2xl font-bold">{article.subject}</div>
              </div>
            </div>
          </div>
          <div className="flex-1 whitespace-pre-wrap p-4 text-md">
            {article.text}
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
