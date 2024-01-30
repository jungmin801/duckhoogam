"use client";
import React, { useMemo, useRef, Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import { supabase } from "../../utils/supabaseClient";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";

interface SetContentProps {
  setContent: Dispatch<SetStateAction<string>>;
}

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    const { default: Resizer } = await import("@botom/quill-resize-module");
    RQ.Quill.register("modules/resize", Resizer);
    return function comp({ forwardRef, ...props }) {
      return <RQ ref={forwardRef} {...props}></RQ>;
    };
  },
  { ssr: false, loading: () => <p>Loading ...</p> }
);

// 동일한 파일명의 파일을 업로드 하기 위해 파일명 뒤에 현재시각을 붙여 새로운 파일명을 만들어준다.
const generateNewFileName = (fileName: string) => {
  const date = new Date();
  const uniqueString = date.toISOString().replace(/[^0-9]/g, "");

  const fileExtension = fileName.split(".").pop();
  const newFileName = `${fileName
    .split(".")
    .slice(0, -1)
    .join(".")}_${uniqueString}.${fileExtension}`;

  return newFileName;
};

const Editor = ({ setContent }: SetContentProps) => {
  const baseURL =
    "https://zzgcgreplpqpwwvvzjzk.supabase.co/storage/v1/object/public/images/";

  const quillRef = useRef();
  const handleChange = (value: string) => {
    setContent(value);
  };

  // 툴바에서 이미지 삽입 버튼을 클릭했을 시 호출하는 함수
  // file를 supabase의 storage에 바로 업로드하고, url을 받아와서 다시 quillRef에 넣어준다.
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      if (input.files) {
        const file = input.files[0];
        const fileName = generateNewFileName(file.name);
        const newFile = new File([file], fileName);

        try {
          const res = await supabase.storage
            .from("images")
            .upload(`public/post/${newFile.name}`, newFile);
          if (res.data) {
            const imgUrl = res.data.path;
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection(true);
            editor.insertEmbed(range.index, "image", baseURL + imgUrl);
            editor.setSelection(range.index + 1);
          } else {
            throw new Error(res.error.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: { image: imageHandler },
      },
      resize: {
        showSize: true,
        altTip: "Hold down the alt key to zoom",
        floatLeft: "Left",
        floatRight: "Right",
        center: "Center",
        restore: "Restore",
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <ReactQuill
      forwardRef={quillRef}
      theme="snow"
      onChange={handleChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default Editor;
