type ResumeHead = {
  id: number;
  title: string;
  modified: string;
};

export type ResumeBody = {
  id?: number;
  title?: string;
  career?: object;
  education?: object;
  skill?: string;
  award?: object;
  language?: string;
};
