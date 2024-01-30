import { NextResponse } from "next/server";
import { supabase } from "../../../../utils/supabaseClient";

export async function POST(request: Request) {
  const data = await request.json();
  const { data: submitData } = await supabase
    .from("post")
    .insert({
      title: data.title,
      content: data.content,
      image: data.image,
      category: data.category,
      userId: data.userId,
    })
    .select("*");

  return NextResponse.json({
    data: submitData,
  });
}
