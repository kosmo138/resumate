type ResumeHead = {
<<<<<<< HEAD
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
=======
  id: number;
  title: string;
  modified: string;
};

export type ResumeBody = {
  id?: number;
  title: string;
  careerData: { date: string; content: string }[];
  careerText: string;
  education: { date: string; content: string }[];
  skill: string;
  award: { date: string; content: string }[];
  language: string;
};
>>>>>>> origin/dev
