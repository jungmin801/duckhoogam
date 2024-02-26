import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function DELETE(request: Request) {
  try {
    // 삭제할 게시글 id값 추출
    const url = new URL(request.url);
    const pathName = url.pathname.split("/");
    const postId = pathName[pathName.length - 1];

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { error: postCategoryError } = await supabase
      .from("post_category")
      .delete()
      .eq("post_id", postId);

    if (postCategoryError) {
      throw new Error(postCategoryError.message);
    }

    const { error: postError } = await supabase
      .from("post")
      .delete()
      .eq("id", postId);

    if (postError) {
      throw new Error(postError.message);
    }

    return NextResponse.json({
      message: "게시글 삭제 성공",
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
}
