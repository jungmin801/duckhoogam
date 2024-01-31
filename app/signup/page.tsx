"use client";
import React from "react";
import BaseButton from "../../components/buttons/BaseButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormValues = {
  userName: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const router = useRouter();
  const defaultStyle =
    "block w-full py-3 border-b border-solid border-custom-gray-300 focus:outline-none font-custom-rg";
  const errorStyle = "border-custom-red";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const submitData = async (data: FormValues) => {
    await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const accountName: string = response.data.user_metadata.accountName;
        router.push(`/profile/${accountName}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <main className="flex items-center max-width h-svh">
      <div className="relative w-1/2 max-w-full p-20 m-auto bg-white min-h-[500px] shadow-xl">
        <h2 className="mb-10 text-2xl text-center font-custom-hv">회원가입</h2>
        <form
          onSubmit={handleSubmit(submitData)}
          className="flex flex-col gap-4"
        >
          <label className="block w-full text-sm font-custom-bd">
            이메일
            <input
              type="email"
              className={`${defaultStyle} ${errors.email && errorStyle}`}
              placeholder="example@gmail.com"
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "올바른 형식의 이메일을 입력해주세요.",
                },
              })}
            />
          </label>
          {errors.email && (
            <p className="text-xs text-custom-red">{errors.email.message}</p>
          )}
          <label className="block w-full text-sm font-custom-bd">
            비밀번호
            <input
              type="password"
              className={`${defaultStyle} ${errors.password && errorStyle}`}
              placeholder="비밀번호를 입력해주세요."
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 6,
                  message: "6자 이상의 비밀번호를 입력하세요.",
                },
              })}
            />
          </label>
          {errors.password && (
            <p className="text-xs text-custom-red">{errors.password.message}</p>
          )}
          <div className="mt-8 text-center">
            <BaseButton
              isSubmit={true}
              isFilled={true}
              txt={"가입하기"}
              width={"w-full"}
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
