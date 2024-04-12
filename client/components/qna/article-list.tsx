import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Article } from "@/config/qna-content"
import { useBoard } from "@/components/qna/use-board"

interface ArticleListProps {
  items: Article[]
}

export function ArticleList({ items }: ArticleListProps) {
  const [board, setBoard] = useBoard()

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              board.selected === item.id && "bg-muted"
            )}
            onClick={() =>
              setBoard({
                ...board,
                selected: item.id,
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="text-lg font-medium">{item.subject}</div>
            </div>
            <div className="text-md line-clamp-2 text-muted-foreground">
              {item.text.substring(0, 200)}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}
