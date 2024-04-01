import { useEffect, useState } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ResumeHead } from "@/types/resume"

interface Props {
  resumeHead: ResumeHead // Props 인터페이스에 resumeHead의 타입을 지정합니다.
}

export default function ResumePDF({ resumeHead }: Props) {
  const [pageContent, setPageContent] = useState("") // 다른 페이지의 HTML을 저장할 상태

  useEffect(() => {
    // 다른 페이지의 URL
    const pageUrl = `/resume/${resumeHead.id}`

    // 다른 페이지의 HTML을 가져오는 비동기 함수
    const fetchPageContent = async () => {
      try {
        const response = await fetch(pageUrl)
        if (!response.ok) {
          throw new Error("Failed to fetch page content")
        }
        const html = await response.text()
        setPageContent(html)
      } catch (error) {
        console.error("Error fetching page content:", error)
      }
    }

    // 페이지 컴포넌트가 마운트될 때 다른 페이지의 HTML을 가져옵니다.
    fetchPageContent()
  }, [resumeHead])

  const downloadPDF = () => {
    // 다른 페이지의 HTML을 캡처하여 PDF로 변환하여 다운로드합니다.
    html2canvas(document.body, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF()
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save("captured-page.pdf")
    })
  }

  return (
    <div>
      <DropdownMenuItem onClick={downloadPDF}>PDF로 다운로드</DropdownMenuItem>
      {/* 가져온 페이지의 HTML을 표시합니다. */}
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    </div>
  )
}
