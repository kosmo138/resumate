import { atom, useAtom } from "jotai"

import { Mail, mails } from "@/config/qna-content"

type Config = {
  selected: Mail["id"] | null
}

const configAtom = atom<Config>({
  selected: mails[0].id,
})

export function useMail() {
  return useAtom(configAtom)
}
