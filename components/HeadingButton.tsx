"use client";

import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { type Level } from "@tiptap/extension-heading";
import { ChevronDownIcon } from "lucide-react";
function HeadingButton() {
  const { editor } = useEditorStore();
  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
  ];
  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal text";
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 shrink-0 rounded-sm hover:bg-neutral-200/80 flex items-center justify-center px-1.5 overflow-hidden text-sm">
          {getCurrentHeading()}
          <ChevronDownIcon className="ml-2 shrink-0 size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-2">
        {headings.map((heading) => (
          <DropdownMenuItem
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              (heading.value == 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: heading.value }) &&
                  "bg-neutral-200/80")
            )}
            key={heading.value}
            onClick={() => {
              if (heading.value == 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: heading.value as Level })
                  .run();
              }
            }}
          >
            <span style={{ fontSize: heading.fontSize }}>{heading.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HeadingButton;
