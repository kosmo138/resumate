"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function RegisterDialog() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState<string>("")
  const [complete, setComplete] = useState<boolean>(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch("/api/member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setComplete(true)
          setMessage(data.message)
        } else {
          setComplete(false)
          alert(data.message)
        }
      })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="align-middle">
          시작하기
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>회원가입</DialogTitle>
        </DialogHeader>
        {complete && (
          <div className="gap-4 py-4 space-y-4">
            <div>{message}</div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Button
                className="col-start-4"
                onClick={() => window.location.reload()}
              >
                확인
              </Button>
            </div>
          </div>
        )}
        {!complete && (
          <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                이메일
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="이메일을 입력해 주세요"
                className="col-span-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                비밀번호
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                className="col-span-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Button type="submit" className="col-start-4">
                확인
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
