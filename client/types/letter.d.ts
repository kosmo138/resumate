type LetterHead = {
  id: number
  title: string
  modified: string
<<<<<<< HEAD
}

export type LetterBody = {
  id?: number
  title?: string
  modified?: string
  section1?: object
  section2?: object
  section3?: object
  section4?: object
  section5?: object
  section6?: object
  section7?: object
  section8?: object
  section9?: object
=======
  id: number
  title: string
  modified: string
}

export type LetterBody = {
  resume_id?: number
  title?: string
  company?: string
  job?: string
  content?: LetterContent[]
}

export type LetterContent = {
  category: string
  text: string
>>>>>>> origin/dev
}
