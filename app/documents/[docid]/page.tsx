import { Id } from "@/convex/_generated/dataModel";
import { DocumentPage } from "./document";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
interface Props {
  params: Promise<{ docid: Id<"documents"> }>;
}
async function DocumentIdPage({ params }: Props) {
  const { docid } = await params;
  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;
  if (!token) {
    throw new Error("Unauthorized");
  }
  const preloadeddocument = await preloadQuery(
    api.documents.getByID,
    { id: docid },
    { token }
  );
  if (!preloadeddocument) throw new Error("Document not found");
  return (
    <div>
      <DocumentPage preloadeddocument={preloadeddocument} />
    </div>
  );
}

export default DocumentIdPage;
