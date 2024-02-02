import { NextResponse } from "next/server";
import { supabase } from "../../../../utils/supabaseClient";
import { generateNewFileName } from "../../../../utils/newFileName";

const fetchImage = () => {};

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

// const handleUploadImage = async (event) => {
//   const baseURL = process.env.NEXT_PUBLIC_IMAGE_BASEURL;
//   const file = event.target.files[0];
//   const fileName = generateNewFileName(file.name);
//   const newFile = new File([file], fileName);

//   try {
//     const res = await supabase.storage
//       .from("images")
//       .upload(`public/profile/${newFile.name}`, newFile);
//     if (res.data) {
//       const newImgUrl = res.data.path;
//       setImgUrl(baseURL + newImgUrl);
//     } else {
//       throw new Error(res.error.message);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
