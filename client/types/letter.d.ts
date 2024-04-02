type LetterHead = {
  id: number
  title: string
  modified: string
}

export type LetterBody = {
  resume_id?: number
  title?: string
  company?: string
  role?: string
  content?: LetterContent[]
}

export type LetterContent = {
  category: string
  text: string
}

export type Selector = {
  value: string | undefined
  onValueChange: (value: string) => void
}