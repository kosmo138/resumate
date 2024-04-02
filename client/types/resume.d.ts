type ResumeHead = {
  id: number;
  title: string;
  updatedAt: string;
};

export type ResumeBody = {
  id?: number;
  title?: string;
  updatedAt?: string;
  careerData?: object;
  careerText?: string;
  education?: object;
  skill?: string;
  award?: object;
  language?: string;
};
