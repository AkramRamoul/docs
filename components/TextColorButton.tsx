"use client";
import { useEditorStore } from "@/store/useEditorStore";
import React from "react";
import { type ColorResult, CompactPicker } from "react-color";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function TextColorButton() {
  const { editor } = useEditorStore();
  const currentColor = editor?.getAttributes("textStyle").color || "#000000";
  const onChangeColor = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 rounded-sm hover:bg-neutral-200/80 flex flex-col items-center justify-center px-1.5 overflow-hidden text-sm">
          <span className="text-xs">A</span>
          <div
            className="h-0.5 w-full"
            style={{ backgroundColor: currentColor }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <CompactPicker color={currentColor} onChange={onChangeColor} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TextColorButton;
