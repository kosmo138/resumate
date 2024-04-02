"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function UnauthorizedDialog() {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>오류</DialogTitle>
        </DialogHeader>
        <div className="gap-4 space-y-4 py-4">
          <div>로그인 후 이용해 주세요</div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Button
              className="col-start-4"
              onClick={() => (window.location.href = "/")}
            >
              확인
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
