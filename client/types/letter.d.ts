type LetterHead = {
  id: number
  title: string
  modified: string
}

export type LetterBody = {
  resume_id: number
  title: string
  company: string
  job: string
  content: LetterContent[]
  modified: string
}

export type LetterContent = {
  category: string
  text: string
}
