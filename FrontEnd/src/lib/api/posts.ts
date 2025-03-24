// lib/api/posts.ts
import { IPost } from "../types/IPost";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getPostById(id: string): Promise<IPost | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error("Post não encontrado");
    }
    const post: IPost = await response.json();
    return post;
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return null;
  }
}