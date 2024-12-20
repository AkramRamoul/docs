"use client";
import { useEditorStore } from "@/store/useEditorStore";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "./ui/dialog";
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function ImageButton() {
  const { editor } = useEditorStore();
  const [imageUrl, setImageUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const ImageUrl = URL.createObjectURL(file);
        onChange(ImageUrl);
      }
    };
    input.click();
  };
  const handleImageSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsOpen(false);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 shrink-0 rounded-sm hover:bg-neutral-200/80 flex flex-col items-center justify-center px-1.5 overflow-hidden text-sm">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="w-4 h-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <SearchIcon className="w-4 h-4 mr-2" />
            Paste image URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image url</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ImageButton;
