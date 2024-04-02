import { LetterProvider } from "@/components/letter/lettercontext"

interface LayoutProps {
  children: React.ReactNode
}
export default function LetterLayout({ children }: LayoutProps) {
  return <LetterProvider>{children}</LetterProvider>
}
