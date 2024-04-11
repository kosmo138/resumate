"use client"
import React from "react"

import { ArticleDisplay } from "@/components/qna/article-display"
import { ArticleList } from "@/components/qna/article-list"
import { Article } from "@/config/qna-content"
import { useBoard } from "@/components/qna/use-board"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

interface BoardProps {
  articles: Article[]
  defaultLayout: number[] | undefined
}

export function Board({ articles, defaultLayout = [265, 440, 655] }: BoardProps) {
  const [board] = useBoard()

  return (
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <TabsContent value="all" className="m-0 h-full">
              <ArticleList items={articles} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <ArticleDisplay
            article={articles.find((item) => item.id === board.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
  )
}
