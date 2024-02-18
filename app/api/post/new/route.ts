import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const data = await request.json();
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data: user } = await supabase.auth.getUser();

  // 썸네일을 위해 첫번째 이미지 태그의 src를 찾기
  const regex = /<img\s+[^>]*?src="([^"]+)"[^>]*>/i;
  const match = data.content.match(regex);
  let thumbnail;

  if (match) {
    thumbnail = match[1];
  }

  // post id를 생성하기 위해 먼저 insert
  const { data: post } = await supabase
    .from("post")
    .insert({
      title: data.title,
      content: data.content,
      thumbnail: thumbnail || "",
      user_id: user.user?.id,
    })
    .select("*");

  // 배열인 카테고리를 하나씩 분리하여 post_category 테이블에 저장하기
  const inserts = data.categories
    .map((categoryId) => ({
      post_id: post[0].id,
      category_id: categoryId,
    }))
    .filter((insert) => insert.category_id !== null);

  const { error: insertError } = await supabase
    .from("post_category")
    .insert(inserts);

  return NextResponse.json({
    data: "테스트중",
  });
}
