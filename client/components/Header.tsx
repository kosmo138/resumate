import Link from "next/link";
import Logo from "@/data/logo.svg";
import siteMetadata from "@/data/siteMetadata.json";

export default function Header() {
  return (
    <header>
      <div>
        <Link href="/" aria-label={siteMetadata.title}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo />
            </div>
            <div className="h-10 text-2xl font-bold sm:block">
              {siteMetadata.title}
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
