"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import BaseButton from "../buttons/BaseButton";
import ImgIcon from "../../public/asset/image/icon-image.svg";
import Select from "../common/Select";
import { Categories, AccountName } from "../../types/types";
import { generateNewFileName } from "../../utils/newFileName";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabaseClient";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type ProfileUploadProps = Categories & AccountName;

const ProfileUploadForm = ({ categories, accountName }: ProfileUploadProps) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const ImgBaseURL = process.env.NEXT_PUBLIC_IMAGE_BASEURL;
  const noProfileImg = process.env.NEXT_PUBLIC_NO_PROFILE_IMAGE_URL;

  const defaultStyle =
    "block w-full py-3 border-b border-solid border-custom-gray-300 focus:outline-none font-custom-rg";
  const errorStyle = "border-custom-red";

  const [imgUrl, setImgUrl] = useState(ImgBaseURL + noProfileImg);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      categories: [],
    },
  });

  const profileImage = watch("image");
  // 프로필 이미지를 storage에 저장하지 않고 createObjectURL로 화면에 렌더링
  useEffect(() => {
    if (profileImage && profileImage.length > 0) {
      const file = profileImage[0];
      setImgUrl(URL.createObjectURL(file));
    }
  }, [profileImage]);

  // 데이터 제출 시에 이미지를 storage에 저장하는 함수
  const uploadImage = async (file) => {
    const fileName = generateNewFileName(file.name);
    const newFile = new File([file], fileName);

    try {
      const res = await supabase.storage
        .from("images")
        .upload(`public/profile/${newFile.name}`, newFile);
      if (res.data) {
        return res.data.path;
      } else {
        throw new Error(res.error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 입력한 데이터를 제출하여 프로필 설정하는 함수
  const handleSubmitData = async (submitData) => {
    try {
      let imgPath;
      const noProfileImg = process.env.NEXT_PUBLIC_NO_PROFILE_IMAGE_URL;

      if (submitData.image[0]) {
        imgPath = await uploadImage(submitData.image[0]);
      } else {
        imgPath = noProfileImg;
      }

      const response = await fetch(`/api/user/${accountName}`, {
        method: "POST",
        body: JSON.stringify({
          userName: submitData.userName,
          image: imgPath,
          categories: submitData.categories,
          intro: submitData.intro,
        }),
      });

      const data = await response.json();

      if (data.message === "프로필 업데이트 성공") {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleSubmitData)}
    >
      <div className="relative m-auto">
        <img
          src={imgUrl}
          alt="프로필 이미지"
          className="rounded-full h-28 w-28"
        />
        <label className="absolute bottom-0 right-0 inline-flex items-center justify-center w-8 h-8 p-1 rounded-full cursor-pointer bg-custom-blue">
          <ImgIcon className="w-5 h-5" />
          <input type="file" {...register("image")} className="hidden" />
        </label>
      </div>
      <div>
        <label className="block w-full pb-3 text-sm font-custom-bd">
          닉네임
          <input
            type="text"
            className={`${defaultStyle} ${errors.userName && errorStyle}`}
            placeholder="닉네임을 입력해주세요."
            {...register("userName", {
              required: "2~10자 내의 닉네임을 입력해주세요.",
              minLength: 2,
              maxLength: 10,
            })}
          />
        </label>
        {errors.userName && (
          <p className="text-xs text-custom-red">{errors.userName.message}</p>
        )}
      </div>
      <div>
        <label className="block w-full pb-3 text-sm font-custom-bd">
          자기소개
          <input
            type="text"
            className={`${defaultStyle} ${errors.intro && errorStyle}`}
            placeholder="자기소개를 입력해주세요."
            {...register("intro", {
              required: "자기소개를 입력해주세요.",
            })}
          />
        </label>
        {errors.intro && (
          <p className="text-xs text-custom-red">{errors.intro.message}</p>
        )}
      </div>
      <div className="relative py-4">
        <strong className={`block font-custom-bd`}>
          관심 분야를 선택해주세요.
          <span className="ml-1 text-xs">(다중 선택 가능)</span>
        </strong>
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
          <p className="absolute bottom-0 left-0 mt-4 text-xs text-custom-red">
            하나 이상의 카테고리를 선택하세요.
          </p>
        )}
      </div>
      <div className="text-center ">
        <BaseButton
          isSubmit={true}
          isFilled={true}
          txt={"덕후감 시작하기"}
          width={"w-full"}
        />
      </div>
    </form>
  );
};

export default ProfileUploadForm;
