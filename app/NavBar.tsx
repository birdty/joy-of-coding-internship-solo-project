import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
const NavBar = () => {
  const issues = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {issues.map((issue) => (
          <Link
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
            key={issue.href}
            href={issue.href}
          >
            {issue.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
