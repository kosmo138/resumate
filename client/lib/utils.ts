/* Tailwind CSS 클래스 설정 관련 라이브러리 */
/* 수정하는 코드가 아닙니다 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
