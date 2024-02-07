import { NextResponse } from "next/server";
import { supabase } from "../../../../utils/supabaseClient";

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const { data: userData, error } = await supabase
      .from("user")
      .upsert([
        {
          image: data.image,
          userName: data.userName,
          categories: data.categories,
          id: data.id,
        },
      ])
      .select("*");
    if (error) {
      throw new Error(error.message);
    } else {
      return NextResponse.json({
        data: userData,
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
