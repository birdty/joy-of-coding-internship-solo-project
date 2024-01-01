"use client";
import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const NavBar = () => {
  const issues = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const currentPath = usePathname();

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {issues.map((issue) => (
          <Link
            key={issue.href}
            href={issue.href}
            className={classnames({
              "text-zinc-900": issue.href === currentPath,
              "text-zinc-500": issue.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
          >
            {issue.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
