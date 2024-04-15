import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { useEffect, useState } from 'react';

interface Selector {
  value: string | undefined
  onValueChange: (value: string) => void
}

export default function CategorySelector({ value, onValueChange }: Selector) {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange(newValue);
  };
  
  return (
    <Select value={selectedValue} onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
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
  )
}