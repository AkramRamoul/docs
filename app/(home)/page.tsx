import Link from "next/link";
import NavBar from "./navbar";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <NavBar />
      </div>
      <div className="mt-16">
        <Link href="/documents/123">
          Click <span className="underline text-blue-500">Here</span> to go
          dynamuc route
        </Link>
      </div>
    </div>
  );
}

export default Home;
