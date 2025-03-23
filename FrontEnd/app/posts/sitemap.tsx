import { config } from "@/config";
import type { MetadataRoute } from "next";
import urlJoin from "url-join";
import { IPost } from "@/lib/types/IPost";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: IPost[] = [];

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`);
    const data = await response.json();

    if (Array.isArray(data)) {
      posts = data;
    } else {
      console.error("Resposta da API não é um array:", data);
    }
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
  }

  return [
    {
      url: urlJoin(config.baseUrl, "blog"),
      lastModified: new Date(),
      priority: 0.8,
    },
    ...posts.map((post) => {
      const lastModified = post.modified_at || post.created_at;
      const lastModifiedDate = lastModified ? new Date(lastModified) : new Date();
      const slug = generateSlug(post.title || "sem-titulo");

      return {
        url: urlJoin(config.baseUrl, "blog", slug),
        lastModified: lastModifiedDate,
        priority: 0.8,
      };
    }),
  ];
}

// Função para gerar slug a partir do título
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/[^\w-]+/g, ""); // Remove caracteres especiais
}