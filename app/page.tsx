import { Inter } from "next/font/google";
import { NextPage } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import HomePage from "../components/home/Home";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const { data: postData, error } = await supabase.from("post").select("*");

  if (error) {
    console.error(error.message);
    return;
  }

  return (
    <main className="relative flex gap-6 max-width">
      <HomePage postData={postData} />
    </main>
  );
};

export default Home;
