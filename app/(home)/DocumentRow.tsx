import { Doc } from "@/convex/_generated/dataModel";
import { SiGoogledocs } from "react-icons/si";
import { TableRow, TableCell } from "@/components/ui/table";
import React from "react";
import { Building2Icon, CircleUserIcon, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
interface DocumentRowProps {
  document: Doc<"documents">;
}
function DocumentRow({ document }: DocumentRowProps) {
  return (
    <TableRow className="cursor-pointer">
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.organizationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        <span>{document.organizationId ? "Organization" : "Personal"}</span>
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "MMM d, yyyy")}
      </TableCell>
      <TableCell className="flex justify-end">
        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <MoreVertical className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default DocumentRow;
