"use client";

import { Session } from "next-auth";
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        {user ? (
          <Image
            src={user?.image || profilePicPlaceholder}
            alt="Profile Picture"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h21 2M7 13h1014-8H5.4M7 5M7 131-2.293 2.29"
            />
          </svg>
        )}
      </label>
      <ul tabIndex={0} className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow">
        <li>
            {
                user ? (
                    <button onClick={() => signOut({callbackUrl: "/"})}>Sign Out</button>
                ) : (
                    <button onClick={() => signIn()}>Sign In</button>
                )
            }
        </li>
      </ul>
    </div>
  );
}
