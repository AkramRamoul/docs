"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DocInput from "./DocInput";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  MenubarShortcut,
  MenubarSub,
} from "@/components/ui/menubar";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/useEditorStore";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Inbox from "./inbox";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import RenameDialog from "@/components/UpdateButton";
import DeleteDialogue from "@/components/DeleteDialogue";
import { Avatars } from "../../../components/Avatars";
interface NavbarProps {
  data: Doc<"documents">;
}
function Navbar({ data }: NavbarProps) {
  const { editor } = useEditorStore();

  const mutation = useMutation(api.documents.post);
  const router = useRouter();
  const onNewDoc = () => {
    mutation({ title: "Untitled document", initialContent: "" }).then((id) => {
      router.push(`/documents/${id}`);
    });
  };
  const insertTable = (rows: number, cols: number) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: rows, cols: cols, withHeaderRow: false })
      .run();
  };
  const OnDownload = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveJson = () => {
    if (!editor) return;
    const json = editor?.getJSON();
    const blob = new Blob([JSON.stringify(json)], {
      type: "application/json",
    });
    OnDownload(blob, `${data.title}.json`);
  };
  const onSaveHtml = () => {
    if (!editor) return;
    const content = editor?.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });
    OnDownload(blob, `${data.title}.html`);
  };
  const onSaveText = () => {
    if (!editor) return;
    const content = editor?.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });
    OnDownload(blob, `${data.title}.text`);
  };
  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href={"/"}>
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          <DocInput title={data.title} id={data._id} />
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJson}>
                        <FileJsonIcon className="size-4 mr-2" />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHtml}>
                        <GlobeIcon className="size-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className="size-4 mr-2" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={onNewDoc}>
                    <FilePlusIcon className="size-4 mr-2" />
                    New document
                  </MenubarItem>
                  <MenubarSeparator />
                  <RenameDialog documentId={data._id} initialTitle={data.title}>
                    <MenubarItem
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onSelect={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <FilePenIcon className="size-4 mr-2" />
                      Rename
                    </MenubarItem>
                  </RenameDialog>
                  <DeleteDialogue documentId={data._id}>
                    <MenubarItem
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onSelect={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <TrashIcon className="size-4 mr-2" />
                      Remove
                    </MenubarItem>
                  </DeleteDialogue>

                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4 mr-2" />
                    Print{" "}
                    <MenubarShortcut className="text-gray-500">
                      Ctrl+P
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => {
                      editor?.chain().focus().undo().run();
                    }}
                  >
                    <Undo2Icon className="size-4 mr-2" />
                    Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => {
                      editor?.chain().focus().redo().run();
                    }}
                  >
                    <Redo2Icon className="size-4 mr-2" />
                    Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => {
                          insertTable(1, 1);
                        }}
                      >
                        1 X 1
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => {
                          insertTable(2, 2);
                        }}
                      >
                        2 X 2
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => {
                          insertTable(3, 3);
                        }}
                      >
                        3 X 3
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => {
                          insertTable(4, 4);
                        }}
                      >
                        4 X 4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="size-4 mr-2" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => {
                          editor?.chain().focus().toggleBold().run();
                        }}
                      >
                        <BoldIcon className="size-4 mr-2" />
                        Bold <MenubarShortcut>Ctrl+B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => {
                          editor?.chain().focus().toggleItalic().run();
                        }}
                      >
                        <ItalicIcon className="size-4 mr-2" />
                        Italic <MenubarShortcut>Ctrl+I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => {
                          editor?.chain().focus().toggleUnderline().run();
                        }}
                      >
                        <UnderlineIcon className="size-4 mr-2" />
                        Underline <MenubarShortcut>Ctrl+U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => {
                          editor?.chain().focus().toggleStrike().run();
                        }}
                      >
                        <StrikethroughIcon className="size-4 mr-2" />
                        <span>Strikethrough&nbsp;&nbsp;</span>{" "}
                        <MenubarShortcut>Ctrl+Shift+S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() => {
                      editor?.chain().focus().unsetAllMarks().run();
                    }}
                  >
                    <RemoveFormattingIcon className="size-4 mr-2" />
                    Clear formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center pl-6">
        <Avatars />
        <Inbox />
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
}

export default Navbar;
