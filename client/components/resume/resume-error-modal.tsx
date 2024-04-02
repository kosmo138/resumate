"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import React, { useState, useEffect } from "react";

export default function ResumeError({ error }: { error: boolean }) {
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
            <Link href="/resume">
              <DialogClose />
            </Link>
            <p className="font-bold text-center text-lg">
              이력서 열람 권한이 없습니다.
            </p>
            <DialogFooter>
              <Link href="/resume">
                <Button variant="default" className="w-full">
                  확인
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
