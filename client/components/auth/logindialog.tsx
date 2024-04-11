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
<<<<<<< HEAD
import React from "react"

export function LoginDialog() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
=======
import { useState } from "react"

type env = string | undefined

export function LoginDialog() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const REST_API_KEY: env = process.env.NEXT_PUBLIC_REST_API_KEY
  const REDIRECT_URI: env = process.env.NEXT_PUBLIC_REDIRECT_URI
  const LOGIN_LINK: env = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
>>>>>>> origin/dev
    e.preventDefault()
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
<<<<<<< HEAD
        if(data.status === "success") {
=======
        if (data.status === "success") {
>>>>>>> origin/dev
          window.location.reload()
        } else {
          alert(data.message)
        }
      })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="align-middle">
          로그인
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
        </DialogHeader>
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
              로그인
            </Button>
          </div>
<<<<<<< HEAD
=======
          <div className="flex flex-row justify-center">
            <a href={LOGIN_LINK}>
              <img src="kakao_login_medium_wide.png" className="col-start-1" />
            </a>
          </div>
>>>>>>> origin/dev
        </form>
      </DialogContent>
    </Dialog>
  )
}
