import { News } from "@/interface/news.types";
import {
  categories,
  categoryNames,
  distname,
  districts,
} from "@/lib/navbar-items";

interface formData {
  newsTitle: string;
  author: string;
  content_1: string;
  content_2: string;
  image: File;
  category: string | null;
  district: string | null;
}

let apiUrl;
export async function Addnews({
  newsTitle,
  author,
  content_1,
  content_2,
  image,
  category,
  district,
}: formData) {
  try {
    const fd = new FormData();
    fd.append("newsTitle", newsTitle);
    fd.append("author", author);
    fd.append("content_1", content_1);
    fd.append("content_2", content_2);
    if (image) fd.append("image", image);
    if (category) fd.append("category", category!);
    if (district) fd.append("district", district!);

    // if (process.env.NODE_ENV === "production") {
    //   apiUrl = process.env.NEXT_PUBLIC_PROD_BACKEND_API;
    //   const res = await fetch(`${apiUrl}/news/create`, {
    //     method: "POST",

    //     body: fd,
    //   });

    //   return res;
    // }
    // if (process.env.NODE_ENV === "development") {
    //   apiUrl = process.env.NEXT_PUBLIC_DEV_BACKEND_API;
    //   const res = await fetch(`${apiUrl}/news/create`, {
    //     method: "POST",

    //     body: fd,
    //   });
    const res = await fetch(`/api/news/add`, {
      method: "POST",
      body: fd,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

// export async function EditNews(
//   {
//     news_title,
//     author,
//     content_1,
//     content_2,
//     image,
//     category,
//     district,
//   }: formData,
//   id: string
// ) {
//   try {
//     const fd = new FormData();
//     fd.append("news_title", news_title);
//     fd.append("author", author);
//     fd.append("content_1", content_1);
//     fd.append("content_2", content_2);
//     if (image) fd.append("image", image);
//     if (category) fd.append("category", category!);
//     if (district) fd.append("district", district!);

//     if (process.env.NODE_ENV === "production") {
//       apiUrl = process.env.NEXT_PUBLIC_PROD_BACKEND_API;
//       const res = await fetch(`${apiUrl}/news/update/${id}`, {
//         method: "PUT",

//         body: fd,
//       });

//       return res;
//     }
//     if (process.env.NODE_ENV === "development") {
//       apiUrl = process.env.NEXT_PUBLIC_DEV_BACKEND_API;
//       const res = await fetch(`${apiUrl}/news/update/${id}`, {
//         method: "PUT",

//         body: fd,
//       });

//       return res;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function DeleteNews(id: string) {
//   try {
//     if (process.env.NODE_ENV === "production") {
//       apiUrl = process.env.NEXT_PUBLIC_PROD_BACKEND_API;
//       const res = await fetch(`${apiUrl}/news/delete/${id}`, {
//         method: "DELETE",
//       });

//       return res;
//     }
//     if (process.env.NODE_ENV === "development") {
//       apiUrl = process.env.NEXT_PUBLIC_DEV_BACKEND_API;
//       const res = await fetch(`${apiUrl}/news/delete/${id}`, {
//         method: "DELETE",
//       });

//       return res;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function GetRelatedNews(
//   type: string,
//   param: string | undefined
// ): Promise<News[] | undefined> {
//   try {
//     if (process.env.NODE_ENV === "production") {
//       apiUrl = process.env.NEXT_PUBLIC_PROD_BACKEND_API;
//       const res = await fetch(`${apiUrl}/news/${type}/${param}`, {
//         method: "GET",
//         cache: "no-store",
//       })
//         .then((data) => data.json())
//         .then((data) => data.data);

//       return res;
//     }
//     if (process.env.NODE_ENV === "development") {
//       apiUrl = process.env.NEXT_PUBLIC_DEV_BACKEND_API;
//       const res = await fetch(`${apiUrl}/news/${type}/${param}`, {
//         method: "GET",
//         cache: "no-store",
//       })
//         .then((data) => data.json())
//         .then((data) => data.data);

//       return res;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
