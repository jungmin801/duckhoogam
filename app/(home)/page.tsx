import { Inter } from "next/font/google";
import Banner from "../../components/common/Banner";
import SideBar from "../../components/sideBar/SideBar";
import Link from "next/link";
import Card from "../../components/common/Card";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const inter = Inter({ subsets: ["latin"] });

export const validate = 0;
export const dynamic = "force-dynamic";

const Home = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  let userProfile;

  const { data: posts } = await supabase.rpc("get_posts");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: userData } = await supabase
      .from("user")
      .select("*")
      .eq("id", user.id);

    userProfile = userData?.[0];
  }

  return (
    <>
      <Banner type={"home"} />
      <main className="relative flex gap-6 max-width">
        {user?.id && <SideBar profile={userProfile} />}
        <ul className={"grid gap-6 grid-cols-3"}>
          {posts.length > 0 &&
            posts.map((post) => (
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
