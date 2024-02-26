"use client";
import React, { useEffect, useState } from "react";
import { Post } from "../../../types/types";
import { formateDate } from "../../../utils/formatDate";
import AuthorInfo from "../../common/AuthorInfo";
import Badge from "../../common/Badge";
import LikeButton from "../../buttons/LikeButton";
import BackButton from "../../buttons/BackButton";
import IconButton from "../../buttons/IconButton";
import ConfirmModal from "../../common/ConfirmModal";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

interface PostContentsProps {
  data: Post[];
  userId: string;
}

export const PostContents = ({ data, userId }: PostContentsProps) => {
  const router = useRouter();
  const [isMyPost, setIsMyPost] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const postData = data[0];
  const formattedDate = formateDate(postData.createdAt);

  // 수정 및 삭제 컨펌모달 핸들러
  const deleteContent = {
    main: "게시글을 삭제하시겠습니까?",
    confirm: "Delete",
    cancel: "Cancel",
  };

  const editContent = {
    main: "게시글을 수정하시겠습니까?",
    confirm: "Modify",
    cancel: "Cancel",
  };

  const handleEditConfirmModal = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirmModal = () => {
    setIsDeleteModalOpen(true);
  };

  // 나의 게시글인지 확인
  useEffect(() => {
    if (userId === postData.userId) {
      setIsMyPost(true);
    }
  }, [postData.userId, userId]);

  // 게시글 삭제 요청

  const fetchDeletePost = async () => {
    const response = await fetch(`/api/post/delete/${postData.postId}`, {
      method: "Delete",
    });
    const data = await response.json();

    if (data.message === "게시글 삭제 성공") {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <div className="w-full max-w-full">
      <div className="py-5">
        <AuthorInfo
          author={postData.userName}
          createdAt={formattedDate}
          profileImage={postData.profileImage}
        />
      </div>
      <ul className="mt-5 mb-2.5 max-h-14 flex flex-wrap gap-1">
        {postData.categoryNames.map((item: string, index: number) => (
          <li key={index}>
            <Badge txt={item} />
          </li>
        ))}
      </ul>
      <div className="flex items-end justify-between gap-2 mb-4">
        <h2 className="text-[2rem] font-custom-bd">{postData.title}</h2>
        <LikeButton />
      </div>
      <hr className="my-8" />
      <div dangerouslySetInnerHTML={{ __html: postData.content }}></div>
      <div className="absolute left-0 top-20">
        <BackButton />
      </div>
      {isMyPost && (
        <div className="absolute flex gap-2 top-[5.6rem] right-20">
          <IconButton type={"modify"} fn={handleEditConfirmModal} />
          <IconButton type={"delete"} fn={handleDeleteConfirmModal} />
        </div>
      )}
      {isEditModalOpen &&
        createPortal(
          <ConfirmModal setIsOpen={setIsEditModalOpen} content={editContent} />,
          document.body
        )}

      {isDeleteModalOpen &&
        createPortal(
          <ConfirmModal
            setIsOpen={setIsDeleteModalOpen}
            content={deleteContent}
            fn={fetchDeletePost}
          />,
          document.body
        )}
    </div>
  );
};

export const NoPostContent = () => {
  return <p>게시글이 없습니다.</p>;
};
