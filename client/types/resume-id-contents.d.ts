export type ResumeContents = {
  title: string;
  titleContent: string;
  career: {
    title: string;
    contentDate: string;
    period: string;
    contents: string;
    count: number;
  };
  textareaContent: string;
  education: {
    title: string;
    contentDate: string;
    period: string;
    contents: string;
    count: 2;
  };
  skill: {
    title: string;
    content: string;
  };
  award: {
    title: string;
    contentDate: string;
    period: string;
    contents: string;
    count: number;
  };
  language: {
    title: string;
    content: string;
  };
};
