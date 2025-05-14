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

// Criação de novo post
export const createPost = async (post: Partial<IPost>): Promise<IPost> => {
  const response = await axios.post(`${API_BASE_URL}/posts`, post);

  if (response.status !== 201 && response.status !== 200) {
    throw new Error('Erro ao criar o post');
  }

  const postData = {
    title: post.title,
    description: post.description,
    content: post.content,
    image: post.image,
  }
  console.log('Enviando post:', postData);

  return response.data;
};

// Atualização de post existente
export const updatePost = async (id: string, post: Partial<IPost>): Promise<IPost> => {
  const response = await axios.put(`${API_BASE_URL}/posts/${id}`, post);

  if (response.status !== 200) {
    throw new Error('Erro ao atualizar o post');
  }

  return response.data;
};
