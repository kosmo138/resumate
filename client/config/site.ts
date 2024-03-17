import { SiteConfig, ContactConfig } from "@/types"

/* ====================
[> WEBSITE CONFIG <]
-- Fill the details about your website
 ==================== */

const baseUrl = "https://resumate.site"

export const siteConfig: SiteConfig = {
  name: "Resumate",
  author: "kosmo",
  description:
    "세상에서 자기소개서를 가장 편하게 쓰는 방법",
  keywords: [
    "자기소개서",
    "이력서",
    "자기소개서 작성",
    "이력서 작성",
    "자기소개서 작성법",
    "이력서 작성법",
    "자기소개서 템플릿",
    "이력서 템플릿",
    "자기소개서 작성 도우미",
    "이력서 작성 도우미",
    "AI 자기소개서",
    "AI 이력서",
    "GPT 자기소개서",
  ],
  url: {
    base: baseUrl,
    author: "https://github.com/kosmo138",
  },
  ogImage: `${baseUrl}/og.jpg`,
}

export const contactConfig: ContactConfig = {
  email: "janreynald.pangilinan@gmail.com",
}
