type ResumeHead = {
  id: number;
  title: string;
  modified: string;
};

export type ResumeBody = {
  id: number;
  title: string;
  careerData: { date: string; content: string }[];
  careerText: string;
  education: { date: string; content: string }[];
  skill: string;
  award: { date: string; content: string }[];
  language: string;
};
