// lib/api/posts.ts
import axios from "axios";
import Constants from "expo-constants";
import { IPost } from "../types/IPost";

const { API_BASE_URL } = Constants.expoConfig?.extra || {};

export const getPosts = async () => {
  const dado = await axios.get(`${API_BASE_URL}/posts`);
  if (dado.status !== 200) {
    throw new Error("Erro ao buscar posts");
  }
  return dado.data;
};



// export async function getPostById(id: string): Promise<IPost | null> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/posts/${id}`);
//     if (!response.ok) {
//       throw new Error("Post não encontrado");
//     }
//     const post: IPost = await response.json();
//     return post;
//   } catch (error) {
//     console.error("Erro ao buscar post:", error);
//     return null;
//   }
// }