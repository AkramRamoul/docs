import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchInput from "./searchInput";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
function NavBar() {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6 ">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
        </Link>
        <h3 className="text-xl font-bold">DOCS</h3>
      </div>
      <SearchInput />
      <div className="flex gap-3 items-center pl-6">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
}

export default NavBar;
