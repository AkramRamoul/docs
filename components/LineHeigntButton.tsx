"use client";

import { useEditorStore } from "@/store/useEditorStore";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ListCollapseIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function LineHeightButton() {
  const { editor } = useEditorStore();
  const lineHeights = [
    {
      label: "Default",
      value: "normal",
    },
    {
      label: "Single",
      value: 1,
    },
    {
      label: "1.15",
      value: 1.15,
    },
    {
      label: "1.5",
      value: 1.5,
    },
    {
      label: "1.75",
      value: 1.75,
    },
    {
      label: "Double",
      value: 2,
    },
    {
      label: "2.25",
      value: 2.25,
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 rounded-sm hover:bg-neutral-200/80 flex flex-col items-center justify-center px-1.5 overflow-hidden text-sm">
          <ListCollapseIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lineHeights.map(({ label, value }) => (
          <button
            onClick={() =>
              editor?.chain().focus().setLineHeight(value.toString()).run()
            }
            key={label}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 h-7 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("paragraph").lineHeight == value &&
                "bg-neutral-200/80"
            )}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LineHeightButton;
