import { ResumeContents } from "@/types/resume-id-contents";

export const resumeContents: ResumeContents = {
  // 제목란 props
  title: "제목",
  titleContent: "제목을 입력해주세요.",
  // 경력란 props
  career: {
    title: "경력",
    contentDate: "기간",
    period: "YYYY-MM ~ YYYY-MM",
    contents:
      "본인의 업무 경험을 기반으로 핵심역량과 업무 스킬을 간단히 작성해주세요.",
    count: 3,
  },
  // 경력란 textarea props
  textareaContent:
    `• 담당하신 업무 중 우선순위가 높은 업무를 선별하여 최신순으로 작성해주세요.\n` +
    `• 신입의 경우, 직무와 관련된 대외활동, 인턴, 계약직 경력 등이 있다면 작성해주세요.\n` +
    `• 업무 또는 활동 시 담당했던 역할과 과정, 성과에 대해 자세히 작성해주세요.\n` +
    `• 업무 성과는 되도록 구체적인 숫자 혹은 [%]로 표현해주세요!\n` +
    `• 커리어 조회 후 기업명이 실제와 다른 경우, 부서명/직책 란에 원하시는 기업명을 작성해주세요.`,
  // 학력란 props
  education: {
    title: "학력",
    contentDate: "기간",
    period: "YYYY-MM ~ YYYY-MM",
    contents: "출신 학교를 입력해 주세요.",
    count: 2,
  },
  // 스킬란 props
  skill: {
    title: "스킬",
    content:
      `• 개발 스택, 디자인 툴, 마케팅 툴 등 가지고 있는 직무와 관련된 스킬을 추가해보세요.\n` +
      `• 데이터 분석 툴이나 협업 툴 등의 사용해본 경험이 있으신 툴들도 추가해보세요.`,
  },
  // 수상 및 기타란 props
  award: {
    title: "수상 및 기타",
    contentDate: "수상날짜",
    period: "YYYY-MM",
    contents: "활동명",
    count: 2,
  },
  // 외국어란 props
  language: {
    title: "외국어",
    content:
      `• 외국어 자격증을 보유한 경우 작성해주세요.\n` +
      `• 활용 가능한 외국어가 있다면, 어느정도 수준인지 레벨을 작성해주세요.`,
  },
};
