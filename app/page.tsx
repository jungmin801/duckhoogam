import { Inter } from "next/font/google";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Banner from "../components/common/Banner";
import SideBar from "../components/sideBar/SideBar";
import Link from "next/link";
import Card from "../components/common/Card";

const inter = Inter({ subsets: ["latin"] });

const Home = async () => {
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
    <>
      <Banner type={"home"} />
      <main className="relative flex gap-6 max-width">
        <SideBar />
        <ul className="grid grid-cols-3 gap-6">
          {postData.map((post) => (
            <li key={post.id}>
              <Link href={`/post/${post.id}`}>
                <Card {...post} />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;
