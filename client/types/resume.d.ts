type ResumeHead = {
    id: number
    title: string
    updatedAt: string
}

export type ResumeBody = {
    id?: number
    title?: string
    updatedAt?: string
    career?: object
    education?: object
    skills?: string
    awards?: object
    languages?: string
}