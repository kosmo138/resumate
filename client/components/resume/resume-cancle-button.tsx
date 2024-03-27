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
import React, { useState } from "react";

export default function ResumeCancleButton() {
  //dialog 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={openDialog}>
            취소
          </Button>
        </DialogTrigger>
        {/* dialog 열렸을시 내용 */}
        {isOpen && (
          <DialogContent>
            <DialogClose onClick={closeDialog} />
            <p className="font-bold text-center text-lg">
              이력서 작성내용이 저장되지 않습니다.
            </p>
            <p className="font-bold text-center text-lg">
              작성을 취소하시겠습니까?
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={closeDialog}>
                취소
              </Button>
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
