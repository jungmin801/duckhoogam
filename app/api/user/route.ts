import { NextResponse } from "next/server";
import { supabase } from "../../../utils/supabaseClient";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { data: userData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      throw new Error(error.message);
    } else {
      return NextResponse.json({
        data: userData,
      });
    }
  } catch (error) {
    NextResponse.json({
      error: error,
    });
  }
}
