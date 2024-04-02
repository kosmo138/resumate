import { useEffect } from "react"
import html2canvas from "html2canvas" // https://seill.tistory.com/1285
import jsPDF from "jspdf" //    라이브러리 설치 필요 : yarn add html2canvas jspdf / npm install html2canvas jspdf
import { Button } from "@/components/ui/button"

export default function ResumePage() {
  const downloadPDF = () => {
    const element = document.body

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF()
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save("Resumate-download.pdf")
    })
  }

  useEffect(() => {
    document.title = "Resumate"
  }, [])

  return (
    <div>
      <Button onClick={downloadPDF}>PDF로 다운로드</Button>
    </div>
  )
}
