"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function CloneDialog() {
  return (
    <Dialog open={false}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>복제</DialogTitle>
        </DialogHeader>
        <div className="gap-4 space-y-4 py-4">
          <div>복제가 완료되었습니다.</div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Button
              className="col-start-4"
              onClick={() => (window.location.href = "/api/resume")}
            >
              {/* https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns */}
              확인
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
