export const mails = [
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
    name: "Resumate",
    email: "resumate@example.com",
    subject: "Resumate를 소개합니다.",
    text: "저희 Resumate는 AI를 이용하여 빠른 시간내에 원하는 이력서, 자기소개서를 작성해줄 수 있습니다.",
    date: "2024-04-11T09:00:00",
    read: true,
    labels: ["서비스 소개"],
  },
  {
    id: "110e8400-e29b-11d4-a716-446655440000",
    name: "Resumate",
    email: "resumate@example.com",
    subject: "이력서 작성방법 안내",
    text: "이력서 작성 화면에 표시 된 정보를 입력하신 후 작성 버튼을 클릭하시면 AI가 자동으로 문장을 추천 해줍니다.",
    date: "2024-04-05T10:30:00",
    read: true,
    labels: ["이력서"],
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
    name: "Resumate",
    email: "resumate@example.com",
    subject: "자기소개서 작성방법 안내",
    text: "자기소개서 작성 화면에 표시 된 정보를 입력하신 후 작성 버튼을 클릭하시면 AI가 자동으로 문장을 작성 해줍니다",
    date: "2023-04-10T11:45:00",
    read: true,
    labels: ["자기소개서"],
  },
  {
    id: "61c35085-72d7-42b4-8d62-738f700d4b92",
    name: "Resumate",
    email: "resumate@example.com",
    subject: "FAQ 게시판 사용안내",
    text: "궁금하신 질문을 남겨주시면 빠른 시일내에 답변 드리도록 하겠습니다.",
    date: "2023-04-2T13:15:00",
    read: false,
    labels: ["이용안내"],
  }
]

export type Mail = (typeof mails)[number]

export const accounts = [
  {
    label: "Alicia Koch",
    email: "alicia@example.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Vercel</title>
        <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Alicia Koch", 
    email: "alicia@gmail.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Gmail</title>
        <path
          d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Alicia Koch",
    email: "alicia@me.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>iCloud</title>
        <path
          d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
          fill="currentColor"
        />
      </svg>
    ),
  },
]

export type Account = (typeof accounts)[number]

export const contacts = [
  {
    name: "Resumate",
    email: "resumate.resumate@example.com",
  },
  
]

export type Contact = (typeof contacts)[number]
