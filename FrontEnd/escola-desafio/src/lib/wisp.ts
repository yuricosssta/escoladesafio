import { IPost } from "@/lib/types/IPost";

export interface GetPostsResult {
  posts: IPost[];
}

// Função para buscar posts
export async function getPosts(): Promise<GetPostsResult> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar posts: ${response.statusText}`);
  }

  return response.json();
}

// Função para buscar um post específico
export async function getPost(id: string): Promise<{ post: IPost }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${id}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar post: ${response.statusText}`);
  }

  return response.json();
}
