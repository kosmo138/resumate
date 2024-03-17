import { HeroHeader, ContentSection } from "@/types/contents"

/* ====================
[> CUSTOMIZING CONTENT <]
-- Setup image by typing `/image-name.file` (Example: `/header-image.jpg`)
-- Add images by adding files to /public folder
-- Leave blank `` if you don't want to put texts or images
 ==================== */

export const heroHeader: HeroHeader = {
  header: `세상에서 가장 쉬운 자기소개서 작성`,
  subheader: `최소의 이력서 정보 입력으로 3분만에 자기소개서를 완성할 수 있습니다`,
  image: `/hero-img.webp`,
}

export const featureCards: ContentSection = {
  header: `어떤 내용을 쓸지 고민하지 마세요`,
  subheader: `자기소개서의 모든 것, 레쥬메이트가 해결해 드립니다`,
  content: [
    {
      text: `경쟁력 있는 초안 작성`,
      subtext: `기업 맞춤형 자기소개서를 작성합니다`,
      icon: "featcard1",
    },
    {
      text: `고성능 AI`,
      subtext: `“어떻게 쓰지?” 고민은 AI에게 맡겨 주세요`,
      icon: "featcard2",
    },
    {
      text: `쉬운 조작법`,
      subtext: `모든 메뉴를 한 번에 익힐 수 있습니다`,
      icon: "featcard3",
    },
  ],
}

export const features: ContentSection = {
  header: `기능 소개`,
  subheader: `레쥬메이트의 주요 기능을 소개합니다`,
  image: `https://fastly.picsum.photos/id/312/400/300.jpg?hmac=rheDmE3u5ebZsvOy_qXh_WcTr7FNRXcUOLtMnVlG7s0`,
  content: [
    {
      text: `이력서와 지원 직무 입력`,
      subtext: `자기소개서 작성에 필요한 최소의 정보입니다`,
      icon: "fileSearch",
    },
    {
      text: `지원 회사 탐색`,
      subtext: `AI가 내용의 우선순위를 판단하여 자소서를 작성합니다`,
      icon: "barChart",
    },
    {
      text: `초안 수정`,
      subtext: `초안을 직접 수정하지 않고 AI 명령으로 보완할 수 있습니다`,
      icon: "settings",
    },
  ],
}
