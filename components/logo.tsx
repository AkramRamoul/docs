import Link from "next/link";

function Logo() {
  return (
    <Link
      href={"/"}
      className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-rose-400 text-transparent bg-clip-text hover:cursor-pointer"
    >
      Docs
    </Link>
  );
}

export default Logo;