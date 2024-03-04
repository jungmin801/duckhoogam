import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data: user } = await supabase.auth.getUser();

    // 썸네일을 위해 첫번째 이미지 태그의 src를 찾기
    const regex = /<img\s+[^>]*?src="([^"]+)"[^>]*>/i;
    const match = data.post.content.match(regex);
    let thumbnail;

    if (match) {
      thumbnail = match[1];
    }

    console.log(data.post.content);

    // post id를 생성하기 위해 먼저 insert
    const { data: post, error: postError } = await supabase
      .from("post")
      .upsert({
        id: data.post.id,
        title: data.post.title,
        content: data.post.content,
        thumbnail: thumbnail || "",
        user_id: user.user?.id,
      })
      .select("*");

    if (postError) {
      throw new Error(postError.message);
    }

    // 이미 존재하는 categoryid 찾기
    const { data: existingCategories, error: existingError } = await supabase
      .from("post_category")
      .select("category_id")
      .eq("post_id", post[0].id);

    if (existingError) {
      throw new Error(existingError.message);
    }

    // 이미 존재하는 categoryId를 기준으로 삭제할 데이터와 새로 추가할 데이터를 구분
    const existingCategoryIds = existingCategories.map((c) => c.category_id);
    const newCategoryIds = data.post.categories.filter((c) => c !== null);
    const toDelete = existingCategoryIds.filter(
      (id) => !newCategoryIds.includes(id)
    );
    const toInsert = newCategoryIds
      .filter((id) => !existingCategoryIds.includes(id))
      .map((id) => ({ post_id: post[0].id, category_id: id }));

    // 테이블에서 데이터 삭제하기
    const { error: deleteError } = await supabase
      .from("post_category")
      .delete()
      .eq("post_id", post[0].id)
      .in("category_id", toDelete);

    // 테이블에 데이터 추가하기
    const { error: insertError } = await supabase
      .from("post_category")
      .insert(toInsert);

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    if (insertError) {
      throw new Error(insertError.message);
    }

    return NextResponse.json({
      message: "게시글 등록 성공",
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
}
