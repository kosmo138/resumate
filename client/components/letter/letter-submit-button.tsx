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

export default function LetterSubmitButton({
  isError,
  saveError,
}: {
  isError: boolean;
  saveError: boolean;
}) {
  //dialog 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" onClick={openDialog} type="submit">
            저장
          </Button>
        </DialogTrigger>
        {/* DialogContent 조건부 렌더링 */}
        {/* 제목을 입력하지 않았을경우 */}
        {isOpen && (
          <DialogContent>
            <DialogClose onClick={closeDialog} />
            {isError && saveError && (
              <>
                <div className="font-bold text-center text-lg">
                  <p>자소서 저장에 실패했습니다.</p>
                  <p>제목을 입력해주세요.</p>
                </div>
                <DialogFooter></DialogFooter>
              </>
            )}
            {/* 제목은 입력했는데 특정 사유로 저장에 실패했을때, 저장에 정공했을때 */}
            {(!isError || (isError && !saveError)) && (
              <>
                <p className="font-bold text-center text-lg">
                  {isError
                    ? "자소서 저장에 실패했습니다."
                    : "자소서 작성내용이 저장되었습니다."}
                </p>
                {!isError && (
                  <DialogFooter>
                    <Link href="/letter">
                      <Button variant="default" className="w-full">
                        확인
                      </Button>
                    </Link>
                  </DialogFooter>
                )}
              </>
            )}
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
