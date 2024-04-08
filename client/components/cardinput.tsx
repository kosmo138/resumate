import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const CardInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { value, onChange, onKeyDown, type, placeholder, className, ...props },
    ref
  ) => {
    return (
      <div className="h-20 object-contain">
        <textarea
          className={cn(
            "flex h-20 w-full resize-none rounded-md border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown} // 키보드 이벤트 핸들러 설정
          placeholder={placeholder}
        />
      </div>
    )
  }
)
CardInput.displayName = "CardInput"

export { CardInput }
