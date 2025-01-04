"use client";

import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { useEditor, EditorContent } from "@tiptap/react";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import HighLight from "@tiptap/extension-highlight";
import ImageResize from "tiptap-extension-resize-image";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import Underline from "@tiptap/extension-underline";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { useEditorStore } from "@/store/useEditorStore";
import TextAlign from "@tiptap/extension-text-align";
import { fontSizeExtention } from "../../_tiptapextentios/font-size";
import { lineHeightExtention } from "@/app/_tiptapextentios/line-height";
import Ruler from "./Ruler";
import { Threads } from "./Threads";
const Editor = () => {
  const liveBlocks = useLiveblocksExtension();
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    onDestroy() {
      setEditor(null);
    },
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    extensions: [
      liveBlocks,
      StarterKit.configure({ heading: false, history: false }),
      Underline,
      lineHeightExtention.configure({
        types: ["heading", "paragraph"],
        defaultLineHeight: "normal",
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Color,
      TaskList,
      fontSizeExtention,
      TextAlign.configure({
        types: ["heading", "paragraph", "list_item", "table_cell"],
      }),
      HighLight.configure({ multicolor: true }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      TaskItem.configure({ nested: true }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TextStyle,
      TableCell,
      Image,
      ImageResize,
      FontFamily,
    ],

    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: "padding-left:56px; padding-right:56px",
        class:
          "focus:outline-none print:border-0 border border-[#C7C7C7] bg-white flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor:text",
      },
    },
  });
  return (
    <div className="size-full overflow-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
      <Ruler />
      <div
        className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto
      print:w-full print:min-w-0"
      >
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
