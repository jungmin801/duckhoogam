"use client";
import React, { useRef, useState, Dispatch, SetStateAction } from "react";
import BaseButton from "../../buttons/BaseButton";
import Select from "../../common/Select";
import Editor from "../../editor/Editor";
import { Categories } from "../../../types/types";

const NewPostForm = ({ categories }: Categories) => {
  const [content, setContent] = useState<string>("");
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    titleError: false,
    categoryError: false,
  });
  const titleRef = useRef(null);

  const checkTitleValid = (ref) => {
    if (!ref.value) {
      setErrors((prev) => ({
        ...prev,
        titleError: true,
      }));
      ref.focus();
    } else {
      setErrors((prev) => ({
        ...prev,
        titleError: false,
      }));
    }
    return ref.value;
  };

  const checkCategoryValid = (arr) => {
    if (arr.length === 0) {
      setErrors((prev) => ({
        ...prev,
        categoryError: true,
      }));
    }

    return arr;
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const titleData = checkTitleValid(titleRef.current);
    const cateData = checkCategoryValid(checkItems);

    const submitData = {
      title: titleData,
      content: content,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019",
      category: cateData,
      userId: "Moonie",
    };

    if (titleData && cateData.length > 0) {
      await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify(submitData),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        });
    }
  };
  return (
    <form
      className="bg-white w-[57rem] max-w-full mt-[-18rem] m-auto p-20 relative rounded-2xl pb-10"
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <div className="relative">
        <input
          type="text"
          className={`w-full py-2 text-3xl font-bold border-b focus:outline-none ${
            errors.titleError && "border-custom-red"
          }`}
          placeholder="제목을 입력하세요"
          ref={titleRef}
        />
        {errors.titleError && (
          <p className="absolute right-0 -translate-y-1/2 top-1/2 text-custom-red">
            제목을 입력하세요
          </p>
        )}
      </div>
      <div className={`relative flex content-between gap-10 py-1 my-8 `}>
        <strong className={`font-bold shrink-0`}>카테고리</strong>
        <Select
          categories={categories}
          checkItems={checkItems}
          setCheckItems={setCheckItems}
        />
        {errors.titleError && (
          <p className="absolute bottom-0 right-0 text-custom-red">
            하나 이상의 카테고리를 선택하세요.
          </p>
        )}
      </div>
      <Editor setContent={setContent} />
      <div className="flex justify-center gap-4 mt-8">
        <BaseButton isSubmit={false} txt={"Cancel"} isFilled={false} />
        <BaseButton isSubmit={true} txt={"Submit"} isFilled={true} />
      </div>
    </form>
  );
};

export default NewPostForm;
