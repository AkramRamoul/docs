import { useEditorStore } from "@/store/useEditorStore";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link2Icon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function LinkButton() {
  const { editor } = useEditorStore();
  const [value, setValue] = useState(editor?.getAttributes("link").href || "");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue(href);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 rounded-sm hover:bg-neutral-200/80 flex flex-col items-center justify-center px-1.5 overflow-hidden text-sm">
          <Link2Icon className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="Paste link"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}></Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinkButton;
