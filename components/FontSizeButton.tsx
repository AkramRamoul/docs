"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

function ListButton() {
  const { editor } = useEditorStore();
  const currentFontSize = editor?.getAttributes("textStyle")?.fontSize
    ? editor?.getAttributes("textStyle")?.fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputFontSize, setInputFontSize] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updataFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      setFontSize(newSize);
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputFontSize(newSize);
      setIsEditing(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFontSize(e.target.value);
  };

  const handleInputBlur = () => {
    updataFontSize(inputFontSize);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updataFontSize(inputFontSize);
      editor?.commands.focus();
    }
  };
  const increment = () => {
    const newsize = parseInt(fontSize) + 1;
    updataFontSize(newsize.toString());
  };
  const dencrement = () => {
    const newsize = parseInt(fontSize) - 1;
    if (newsize > 0) {
      updataFontSize(newsize.toString());
    }
  };
  return (
    <div className="flex items-center gap-0.5">
      <button className="h-7 w-7 shrink-0 rounded-sm hover:bg-neutral-200/80 flex items-center justify-center">
        <MinusIcon className="size-4" onClick={dencrement} />
      </button>

      {isEditing ? (
        <input
          type="number"
          value={inputFontSize}
          className="w-12 h-7 p-1 text-sm text-center border bg-transparent focus:outline-none focus:ring-0 border-neutral-400 rounded-sm"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <button
          className="h-7 w-10 text-sm text-center bg-transparent border border-neutral-400 rounded-sm"
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
        >
          {currentFontSize}
        </button>
      )}
      <button className="h-7 w-7 shrink-0 rounded-sm hover:bg-neutral-200/80 flex items-center justify-center">
        <PlusIcon className="size-4" onClick={increment} />
      </button>
    </div>
  );
}

export default ListButton;
