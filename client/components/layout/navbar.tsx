"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { siteConfig } from "@/config/metadata"
import { navLinks } from "@/config/navlinks"
import { settings } from "@/config/settings"
import Image from "next/image"
import { LoginDialog } from "@/components/auth/login"
import { MemberMenu } from "../auth/membermenu"

export default function Navbar() {
  const [navbar, setNavbar] = useState(false)
  /* true: 드롭다운 메뉴, false: 로그인 버튼 */
  const loginFlag = true

  const handleClick = async () => {
    setNavbar(false)
  }

  useEffect(() => {
    if (navbar) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [navbar])

  return (
    <header className="select-none">
      <nav className="mx-auto justify-between px-4 py-5 md:flex md:items-center md:px-8 lg:max-w-7xl">
        <div>
          <div className="flex flex-row justify-between">
            <Link
              href="/"
              onClick={handleClick}
              className="flex flex-row items-center gap-2 text-primary duration-200 lg:hover:scale-[1.10]"
            >
              <Image
                src="/logo.svg"
                className="dark:brightness-0 dark:invert-[1]"
                alt="Resumate Logo"
                width={40}
                height={40}
              />
              <h1 className="text-2xl font-bold">{siteConfig.name}</h1>
            </Link>
            {/**
             * 모바일 페이지를 고려한 반응형 디자인
             * @see https://tailwindcss.com/docs/responsive-design
             */}
            <div className="flex gap-1 md:hidden">
              <button
                className="rounded-md p-2 text-primary outline-none focus:border focus:border-primary"
                aria-label="Hamburger Menu"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
              <ModeToggle />
            </div>
          </div>
        </div>
        <div>
          {/* 모바일: 햄버거 메뉴 클릭 시 메뉴 표시 */}
          <div
            className={`absolute left-0 right-0 z-10 m-auto justify-self-center rounded-md border bg-background p-4 md:static md:mt-0 md:block md:border-none md:p-0 ${
              navbar ? "block" : "hidden"
            }`}
            style={{ width: "100%", maxWidth: "20rem" }}
          >
            {/* navLinks = 이력서, 자소서, 채용정보 */}
            <ul className="flex flex-col items-center space-y-4 text-primary opacity-60 md:flex-row md:space-x-6 md:space-y-0">
              {navLinks.map((link) => (
                <li key={link.route}>
                  <Link
                    className="hover:underline"
                    href={link.path}
                    onClick={handleClick}
                  >
                    {link.route}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {settings.themeToggleEnabled && (
          <div className="hidden space-x-4 md:block">
            {/* 로그인되어있지 않다면 로그인 버튼 표시 */}
            {loginFlag && <MemberMenu />}
            {!loginFlag && <LoginDialog />}
            <ModeToggle />
          </div>
        )}
      </nav>
    </header>
  )
}
