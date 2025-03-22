import { config } from "@/config";
import type { MetadataRoute } from "next";
import urlJoin from "url-join";
import { IPost } from "@/lib/types/IPost";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`);
  const posts: IPost[] = await response.json();

  return [
    {
      url: urlJoin(config.baseUrl, "blog"),
      lastModified: new Date(),
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: urlJoin(config.baseUrl, "blog", generateSlug(post.title)), // Geramos o slug a partir do título
      lastModified: new Date(post.modified_at || post.created_at || new Date()),
      priority: 0.8,
    })),
  ];
}

// Função para gerar slug a partir do título
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/[^\w-]+/g, ""); // Remove caracteres especiais
}
