type LetterHead = {
  id: number;
  title: string;
  modified: string;
  resume_id: number;
};

export type LetterBody = {
  resume_id: number;
  title: string;
  company: string;
  job: string;
  content: LetterContent[];
};

export type LetterContent = {
  category: string;
  text: string;
  command: string;
};
