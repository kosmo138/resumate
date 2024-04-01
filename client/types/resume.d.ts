type ResumeHead = {
  id: number
  title: string
  modified: string
}

export type ResumeBody = {
  id?: number
  title?: string
  modified?: string
  career?: object
  education?: object
  skills?: string
  awards?: object
  languages?: string
}
const newResumeList:
    | ResumeHead
    | {
        id: number
        title: string
        updateAt: string
      },
  []
