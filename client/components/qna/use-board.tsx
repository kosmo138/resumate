import { atom, useAtom } from "jotai"

import { Article, articles } from "@/config/qna-content"

type Config = {
  selected: Article["id"] | null
}

const configAtom = atom<Config>({
  selected: articles[0].id,
})

export function useBoard() {
  return useAtom(configAtom)
}
