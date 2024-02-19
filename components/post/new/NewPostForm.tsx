"use client";
import React, { useState } from "react";
import BaseButton from "../../buttons/BaseButton";
import Select from "../../common/Select";
import Editor from "../../editor/Editor";
import { Categories } from "../../../types/types";
import { useForm } from "react-hook-form";
import ConfirmModal from "../../common/ConfirmModal";
import { NewPost } from "../../../types/types";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

const NewPostForm = ({ categories }: Categories) => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [post, setPost] = useState<NewPost>();
  const router = useRouter();

  const submitPostingModalContent = {
    main: "게시글을 등록하시겠습니까?",
    confirm: "Upload",
    cancel: "Cancel",
  };

  const CancelPostingModalContent = {
    main: "글 작성을 취소하시겠습니까?",
    sub: "작성하신 내용은 저장되지 않습니다.",
    confirm: "Confirm",
    cancel: "Cancel",
  };

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

  const handleSubmitPost = (post: NewPost) => {
    setIsSubmitModalOpen(true);
    setPost((prev) => ({
      ...prev,
      ...post,
    }));
  };

  const handleCancel = () => {
    setIsCancelModalOpen(true);
  };

  const fetchNewPost = async (post?: NewPost): Promise<void> => {
    const response = await fetch("/api/post/new", {
      method: "POST",
      body: JSON.stringify(post),
    });
    const message = await response.json();
    if (message === "게시글 등록 성공") {
      router.push("/");
      router.refresh();
    }
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
          <BaseButton
            isSubmit={false}
            txt={"Cancel"}
            isFilled={false}
            fn={() => {
              handleCancel();
            }}
          />
          <BaseButton isSubmit={true} txt={"Submit"} isFilled={true} />
        </div>
      </form>
      {isSubmitModalOpen &&
        post &&
        createPortal(
          <ConfirmModal<NewPost>
            setIsOpen={setIsSubmitModalOpen}
            content={submitPostingModalContent}
            fn={fetchNewPost}
            fnArgs={post}
          />,
          document.body
        )}
      {isCancelModalOpen &&
        post &&
        createPortal(
          <ConfirmModal<NewPost>
            setIsOpen={setIsCancelModalOpen}
            content={CancelPostingModalContent}
            fn={() => {
              router.push("/");
              router.refresh();
            }}
          />,
          document.body
        )}
    </>
  );
};

export default NewPostForm;
