import Link from "next/link";

function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Link href="/documents/123">
        Click <span className="underline text-blue-500">Here</span> to go
        dynamuc route
      </Link>
    </div>
  );
}

export default Home;
