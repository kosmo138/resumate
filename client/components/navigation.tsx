"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../styles/navigation.module.css";

export default function Navigation() {
  const path = usePathname();
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/User/resumate">이력서</Link>
          {path === "/User/resumate" ? "📁" : ""}
        </li>
        <li>
          <Link href="/User/editor">자소서</Link>
          {path === "/User/editor" ? "🖋" : ""}
        </li>
        <li>
          <Link href="/User/community">커뮤니티</Link>
          {path === "/User/community" ? "📝" : ""}
        </li>
        <li>
          <Link href="/User/help">도움말</Link>
          {path === "/User/help" ? "👓" : ""}
        </li>
      </ul>
    </nav>
  );
}
