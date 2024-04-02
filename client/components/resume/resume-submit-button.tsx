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

export default function ResumeSubmitButton() {
  //dialog 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" onClick={openDialog} type="submit">
            저장
          </Button>
        </DialogTrigger>
        {/* dialog 열렸을시 내용 */}
        {isOpen && (
          <DialogContent>
            <DialogClose onClick={closeDialog} />
            <p className="font-bold text-center text-lg">
              이력서 작성내용이 저장되었습니다.
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
