import { Inter } from "next/font/google";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import HomePage from "../components/home/Home";
const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const { data: postData, error } = await supabase.from("post").select("*");

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <main className="max-width ">
      <HomePage postData={postData} />
    </main>
  );
}
