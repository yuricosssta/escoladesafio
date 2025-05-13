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

const transformPost = (data: any): IPost => ({
  id: data._id || data.id,
  title: data.title || '',
  content: data.content || '',
  description: data.description || '',
  created_at: new Date(data.created_at),
  modified_at: data.modified_at ? new Date(data.modified_at) : undefined,
  image: data.image,
  author: data.author,
  published: data.published,
});

export const getPostById = async (id: string): Promise<IPost> => {
  const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
  return transformPost(response.data);
};

// export const getPostById = async (id: string): Promise<IPost> => {
//   const response = await axios.get<IPost>(`${API_BASE_URL}/posts/${id}`);
//   console.log('Post ID:', response.data.id);

//   return response.data;
// };


// async getPost(id: string): Promise<IPost | null> {
//     if (!id) {
//       console.error("ID inválido fornecido");
//       return null;
//     }

//     try {
//       const data = await this.request<any>(`/posts/${id}`, this.getRequestHeaders());
//       return this.transformPost(data);
//     } catch (error) {
//       console.error(`Erro ao buscar post ${id}:`, error); 
//       return null;
//     }
//   }

//   // Método para transformar dados brutos em IPost
//   private transformPost(data: any): IPost {
//     if (!data.id && !data._id) {
//       console.warn("Post sem ID encontrado:", data);
//       throw new Error("Dados do post inválidos: ID ausente");
//     }

//     return {
//       id: data.id || data._id, // Suporta tanto 'id' quanto '_id'
//       title: data.title || "",
//       description: data.description || "",
//       created_at: data.created_at ? new Date(data.created_at) : new Date(),
//       modified_at: data.modified_at ? new Date(data.modified_at) : undefined,
//       image: data.image || undefined,
//       author: data.author || undefined,
//     };
//   }


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