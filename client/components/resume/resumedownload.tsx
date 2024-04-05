import React, { useEffect } from "react";
import jsPDF from "jspdf"; //    라이브러리 설치 필요 : yarn add html2canvas jspdf / npm install html2canvas jspdf
import domtoimage from "dom-to-image"; // 라이브러리 설치 필요
import { Button } from "@/components/ui/button";

export default function ResumePage({ resumeRef }: { resumeRef: any }) {
  const divRef = resumeRef;

  const downloadPDF = () => {
    if (divRef.current) {
      // DOM 요소를 이미지로 변환
      domtoimage
        .toPng(divRef.current)
        .then((dataUrl) => {
          // 이미지를 새로운 jsPDF 인스턴스에 추가
          const pdf = new jsPDF();
          const imgProps = pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          // 좌우 상하 여백 추가
          const margin = 10; // 여백 크기를 조절할 수 있습니다.
          const marginLeft = margin;
          const marginRight = pdfWidth - margin;
          const marginTop = margin;
          const marginBottom = pdfHeight - margin;

          pdf.addImage(
            dataUrl,
            "PNG",
            marginLeft,
            marginTop,
            marginRight - marginLeft,
            marginBottom - marginTop
          );
          // PDF 파일 저장
          pdf.save("document.pdf");
        })
        .catch((error) => {
          console.error("Error creating PDF:", error);
        });
    }
  };

  useEffect(() => {}, [divRef.current]);

  return (
    <div>
      <Button variant="secondary" onClick={downloadPDF}>
        PDF로 다운로드
      </Button>
    </div>
  );
}
