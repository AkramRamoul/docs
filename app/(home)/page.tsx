"use client";
import { usePaginatedQuery } from "convex/react";
import NavBar from "./navbar";
import Templates from "./template-gallery";
import { api } from "@/convex/_generated/api";
import DocumentsList from "./DocumentsList";

function Home() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.listDocuments,
    {},
    { initialNumItems: 5 }
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <NavBar />
      </div>
      <div className="mt-16">
        <Templates />
        <DocumentsList
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
}

export default Home;
