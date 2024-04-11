"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import React, { useState } from "react";

export default function SaveButton() {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleClick = () => {
    alert("저장 버튼이 클릭되었습니다.");
  };

  return (
    <div className="flex justify-end space-x-4 mt-5">
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={openDialog}>
              취소
            </Button>
          </DialogTrigger>

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
                  <Button>확인</Button>
                </Link>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
      <div>
        <Button onClick={handleClick}>저장</Button>
      </div>
    </div>
  );
}