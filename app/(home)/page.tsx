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
  const { data: user } = await supabase.auth.getUser();

  if (user) {
    const { data: userData, error } = await supabase.rpc("get_user_by_id", {
      _user_id: user.user.id,
    });
    if (error) {
      console.error(error);
    } else {
      userProfile = userData[0];
    }
  }

  return (
    <>
      <Banner type={"home"} />
      <main className="relative flex gap-6 max-width">
        {user.user.id && <SideBar profile={userProfile} />}
        <ul className={"grid gap-6 grid-cols-3"}>
          {posts.length > 0 &&
            posts.map((post) => (
              <li key={post.postId}>
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
