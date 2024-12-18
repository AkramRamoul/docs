"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import Underline from "@tiptap/extension-underline";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { useEditorStore } from "@/store/useEditorStore";
const Editor = () => {
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
      StarterKit.configure({ heading: false }),
      Underline,
      TaskList,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      TaskItem.configure({ nested: true }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ImageResize,
    ],
    content: `
        <p>This is a basic example of implementing images. Drag to re-order.</p>
        <img src="https://placehold.co/800x400" />
        <img src="https://placehold.co/800x400/6A00F5/white" />
      `,
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
      <div
        className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto
      print:w-full print:min-w-0"
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
