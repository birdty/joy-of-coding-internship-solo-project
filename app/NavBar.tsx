"use client";
import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const NavBar = () => {
  const tasks = [
    { label: "Dashboard", href: "/" },
    { label: "Tasks", href: "/tasks" },
  ];

  const currentPath = usePathname();

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {tasks.map((task) => (
          <Link
            key={task.href}
            href={task.href}
            className={classnames({
              "text-zinc-900": task.href === currentPath,
              "text-zinc-500": task.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
          >
            {task.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
