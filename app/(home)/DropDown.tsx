import DeleteDialogue from "@/components/DeleteDialogue";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import RenameDialog from "@/components/UpdateButton";
import { Id } from "@/convex/_generated/dataModel";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  ExternalLinkIcon,
  FilePenIcon,
  MoreVertical,
  TrashIcon,
} from "lucide-react";
import React from "react";

interface DropDownProps {
  documnetId: Id<"documents">;
  title: string;
  onNewTab: (id: Id<"documents">) => void;
}
function DropDown({ documnetId, title, onNewTab }: DropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="" onClick={() => onNewTab(documnetId)}>
        <DeleteDialogue documentId={documnetId}>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <TrashIcon className="size-4 mr-2" />
            Remove
          </DropdownMenuItem>
        </DeleteDialogue>
        <RenameDialog documentId={documnetId} initialTitle={title}>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FilePenIcon className="size-4 mr-2" />
            Rename
          </DropdownMenuItem>
        </RenameDialog>
        <DropdownMenuItem>
          <ExternalLinkIcon className="size-4 mr-2" />
          Open in new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
