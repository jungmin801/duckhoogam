import { NextResponse } from "next/server";
import { supabase } from "../../../../utils/supabaseClient";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data: user } = await supabase.auth.getUser();

    const { error: profileError } = await supabase.from("user").upsert([
      {
        id: user.user?.id,
        image: data.image,
        user_name: data.userName,
        intro: data.intro,
      },
    ]);
    if (profileError) throw new Error(profileError.message);

    // 기존에 등록된 카테고리 정보를 모두 삭제
    const { error: deleteError } = await supabase
      .from("user_category")
      .delete()
      .match({ user_id: user.user?.id });

    if (deleteError) throw new Error(deleteError.message);

    // 삭제 후, 새 카테고리 배열로 로우 삽입
    const inserts = data.categories
      .map((categoryId) => ({
        user_id: user.user?.id,
        category_id: categoryId,
      }))
      .filter((insert) => insert.category_id !== null);

    const { error: insertError } = await supabase
      .from("user_category")
      .insert(inserts);

    if (insertError) throw new Error(insertError.message);

    return NextResponse.json({
      message: "프로필 업데이트 성공",
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
}
