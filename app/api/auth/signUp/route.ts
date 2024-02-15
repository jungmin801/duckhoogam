import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

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
    }
    return NextResponse.json({
      data: userData.user,
    });
  } catch (error) {
    NextResponse.json({
      error: error,
    });
  }
}
