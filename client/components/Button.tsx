"use client";
import Link from "next/link";

interface Button {
  href: string; //이동할 경로
  text: string; //버튼 텍스트
  onClick?: () => void; //선택적으로 클릭 이벤트 핸들러 함수
}

const Button: React.FC<Button> = ({ href, text, onClick }) => {
  return (
    <Link href={href}>
      <a onClick={onClick}>{text}</a>
    </Link>
  );
};

export default Button;
