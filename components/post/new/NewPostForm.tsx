"use client";
import React, { useState } from "react";
import BaseButton from "../../buttons/BaseButton";
import Select from "../../common/Select";
import Editor from "../../editor/Editor";
import { Categories } from "../../../types/types";
import { useForm } from "react-hook-form";
import ConfirmModal from "../../common/ConfirmModal";

const NewPostForm = ({ categories }: Categories) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      categories: [],
      title: "",
      content: "",
    },
    mode: "onChange",
  });

  const handleSubmitPost = async (post) => {
    setIsOpen(true);
    // const response = await fetch("/api/post/new", {
    //   method: "POST",
    //   body: JSON.stringify(post),
    // });
  };
  return (
    <>
      <form
        className="bg-white w-[57rem] max-w-full mt-[-18rem] m-auto p-20 relative rounded-2xl pb-10"
        onSubmit={handleSubmit(handleSubmitPost)}
      >
        <div className="relative">
          <label>
            <input
              type="text"
              className={`w-full py-2 text-3xl font-custom-bd border-b focus:outline-none ${
                errors.title && "border-custom-red"
              }`}
              placeholder="제목을 입력하세요."
              {...register("title", {
                required: "제목을 입력해주세요.",
              })}
            />
          </label>
          {errors.title && (
            <p className="absolute right-0 -translate-y-1/2 top-1/2 text-custom-red">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className={`relative flex content-between gap-10 py-1 my-8 `}>
          <strong className={`font-custom-bd shrink-0`}>카테고리</strong>
          <Select
            control={control}
            name="categories"
            categories={categories}
            rules={{
              validate: () => {
                return (
                  getValues("categories").length > 0 ||
                  "하나 이상의 카테고리를 선택해주세요."
                );
              },
            }}
          />
          {errors.categories && (
            <p className="absolute bottom-0 right-0 text-custom-red">
              하나 이상의 카테고리를 선택하세요.
            </p>
          )}
        </div>
        <Editor setValue={setValue} trigger={trigger} />
        <div className="flex justify-center gap-4 mt-8">
          <BaseButton isSubmit={false} txt={"Cancel"} isFilled={false} />
          <BaseButton isSubmit={true} txt={"Submit"} isFilled={true} />
        </div>
      </form>
      {isOpen && (
        <ConfirmModal
          setIsOpen={setIsOpen}
          checkMsg={"게시글을 등록하시겠습니까?"}
          cancelTxt={"취소하기"}
          confirmTxt={"등록하기"}
        />
      )}
    </>
  );
};

export default NewPostForm;
