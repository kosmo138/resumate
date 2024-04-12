"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import React, { useState, useEffect } from "react";

//
export default function LetterError({ error, onConfirm }: { error: boolean; onConfirm: () => void }) {
  //dialog 상태 관리
  const [isOpen, setIsOpen] = useState(false);


  // 부모 컴포넌트에서 전달된 error props 값이 true일 때 isOpen 상태를 true로 변경
  useEffect(() => {
    if (error == true) {
      setIsOpen(true);
    }
  }, [error]);

  return (
    <div>
      <Dialog open={isOpen}>
        {/* dialog 열렸을시 내용 */}
        {isOpen && (
          <DialogContent>
              <DialogClose />
            <p className="font-bold text-center text-lg">
              더 이상 삭제할 수 없습니다.
            </p>
            <DialogFooter>
                <Button variant="default" className="w-full" onClick={onConfirm}>
                  확인
                </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
