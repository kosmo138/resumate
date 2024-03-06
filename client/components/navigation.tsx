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
          <Link href="/User/ResumateMng">Resumate Mng</Link>
          {path === "/User/ResumateMng" ? "📁" : ""}
        </li>
        <li>
          <Link href="/User/Resume/Complete">Complete</Link>
          {path === "/User/Resume/Complete" ? "📝" : ""}
        </li>
        <li>
          <Link href="/User/Resume/Edit">Edit</Link>
          {path === "/User/Resume/Edit" ? "🖋" : ""}
        </li>
        <li>
          <Link href="/User/Resume/View">View</Link>
          {path === "/User/Resume/View" ? "👓" : ""}
        </li>
        <li>
          <Link href="/User/Resume/Write">Write</Link>
          {path === "/User/Resume/Write" ? "📋" : ""}
        </li>
      </ul>
    </nav>
  );
}
