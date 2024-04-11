import * as React from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';

interface Selector {
  value: string | undefined
  onValueChange: (value: string) => void
}

export default function CategorySelector(selector: Selector) {
  return (
    <Select value={selector.value} onValueChange={selector.onValueChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Category</SelectLabel> */}
              <SelectItem value="성장과정">성장과정</SelectItem>
              <SelectItem value="지원동기">지원동기</SelectItem>
              <SelectItem value="성격의 장단점">성격의 장단점</SelectItem>
              <SelectItem value="입사 후 포부">입사 후 포부</SelectItem>
              <SelectItem value="기업 이해 및 분석">기업 이해 및 분석</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
  )
}