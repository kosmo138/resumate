import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
 
const invoices = [
  {
    invoice: "1",
    paymentStatus: "Q&A",
    totalAmount: "관리자",
    paymentMethod: "이력서를 작성하는 방법을 알려주세요.",
  },
  {
    invoice: "2",
    paymentStatus: "Q&A",
    totalAmount: "관리자",
    paymentMethod: "자기소개서를 작성하는 방법을 알려주세요.",
  },
  {
    invoice: "3",
    paymentStatus: "Q&A",
    totalAmount: "관리자",
    paymentMethod: "이력서, 자기소개서를 파일로 저장하는 방법을 알려주세요.", 
  },
  {
    invoice: "4",
    paymentStatus: "Q&A",
    totalAmount: "관리자",
    paymentMethod: "회원탈퇴 방법에 대하여 알려주세요.",
  },
  {
    invoice: "5",
    paymentStatus: "Q&A",
    totalAmount: "관리자",
    paymentMethod: "이력서, 자기소개서 작성 꿀팁",
  },
  {
    invoice: "6",
    paymentStatus: "Q&A",
    totalAmount: "관리자",
    paymentMethod: "AI에게 질문 할 때 효과적인 질문을 할 수 있는 방법.",
  },
  {
    invoice: "7",
    paymentStatus: "Q&A",
    totalAmount: "관리자",
    paymentMethod: "이력서, 자기소개서 수정 방법.",
  },
]
 
export default function TableDemo() {
  return (
    <Table>
      <TableCaption>세상에서 이력서를 가장 쉽게 작성하는 방법 Resumate.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>카테고리</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="text-right">답변자</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

//테이블 데모