import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { useEffect, useState } from 'react';

// Selector 인터페이스 정의
interface Selector {
  value: string | undefined // 카테고리 셀렉트박스 선택된 값
  onValueChange: (value: string) => void // 선택된 값 변경 핸들러
}

// CategorySelector 컴포넌트 정의
export default function CategorySelector({ value, onValueChange }: Selector) {
  const [selectedValue, setSelectedValue] = useState(value); // 카테고리 셀렉트박스 선택된 값 상태
  
  // 셀렉트박스 값이 변경될 때마다 선택된 값 업데이트
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  // 값이 변경될 때 실행되는 함수
  const handleChange = (newValue: string) => {
    setSelectedValue(newValue); // 선택된 값 상태 업데이트
    onValueChange(newValue); // 선택된 값을 부모 컴포넌트로 전달
  };
  
  return (
    <div>
    <Select value={selectedValue} onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* 카테고리 항목 */}
              <SelectItem value="성장과정">성장과정</SelectItem>
              <SelectItem value="지원동기">지원동기</SelectItem>
              <SelectItem value="성격의 장단점">성격의 장단점</SelectItem>
              <SelectItem value="입사 후 포부">입사 후 포부</SelectItem>
              <SelectItem value="기업 이해 및 분석">
                기업 이해 및 분석
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
    </div>
  )
}