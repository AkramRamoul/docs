"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}
function ToolbarButton({ onClick, isActive, icon: Icon }: ToolbarButtonProps) {
  return (
    <button
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-small hover:bg-neutral-200/80 ",
        isActive && "bg-neutral-200/80"
      )}
      onClick={onClick}
    >
      <Icon className="size-4" />
    </button>
  );
}

function Toolbar() {
  const { editor } = useEditorStore();

  const sections: {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("specllcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current == "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
      {
        label: "Strikethrough",
        icon: StrikethroughIcon,
        isActive: editor?.isActive("strike"),
        onClick: () => editor?.chain().focus().toggleStrike().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("todo"),
        isActive: false, //todo enable this
      },
      {
        label: "TODO-list",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto print:hidden">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* //todo font families */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* //todo font sizes   */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* // todo Heading  */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* // todo textcolor  */}
      {/* // todo highlight color */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* // todo link */}
      {/* // todo Image */}
      {/* // todo align */}
      {/* // todo line height */}
      {/* // todo list */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
}

export default Toolbar;
