"use client";
import { useQuery } from "convex/react";
import NavBar from "./navbar";
import Templates from "./template-gallery";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";

function Home() {
  const documents = useQuery(api.documents.listDocuments);
  if (documents === undefined)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="animate-spin h-12 w-12" />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <NavBar />
      </div>
      <div className="mt-16">
        <Templates />
        {documents?.map((document) => (
          <span key={document._id}>{document.title}</span>
        ))}
      </div>
    </div>
  );
}

export default Home;
