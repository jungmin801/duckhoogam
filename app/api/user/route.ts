import { NextResponse } from "next/server";
import { supabase } from "../../../utils/supabaseClient";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const split = data.email.split("@");
    const accountName = split[0];
    const { data: userData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          accountName: accountName,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    } else {
      return NextResponse.redirect(
        new URL(`/profile/${accountName}`, request.url)
      );
    }
  } catch (error) {
    NextResponse.json({
      error: error,
    });
  }
}
