import Image from "next/image";
import Link from "next/link";
import { formatFullDate } from "@/lib/date";
import { IPost } from "@/lib/types/IPost";

interface PostsPreviewProps {
  posts: IPost[];
}


export const PostList = ({ posts }: { posts: PostsPreviewProps["posts"] }) => {
  console.log("Posts recebidos:", posts.map(p => ({ id: p.id, title: p.title })));
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 px-4">
      {posts.map((post) => (
        <div className="break-words" key={post.id}>
          {/* Link principal */}
          <Link href={`/posts/${post.id}`}>
            <div className="aspect-[16/9] relative cursor-pointer">
              {post.image ? (
                <Image
                  alt={post.title}
                  className="object-cover"
                  src={post.image}
                  fill
                />
              ) : (
                <Image src="/placeholder.jpg" alt="placeholder" fill />
              )}
            </div>
          </Link>

          {/* Conteúdo do post */}
          <div className="grid grid-cols-1 gap-3 md:col-span-2 mt-4">
            <h2 className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <div className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
              {post.description}
            </div>
            <Link href={`/posts/${post.id}/edit`} className="btn btn-sm btn-secondary">
                  Editar
                </Link>
            <div className="flex items-center gap-2">
              <div className="font-medium">
                {post.author} | Publicado em {formatFullDate(post.modified_at)}
              </div>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/*
import Image from "next/image";
import Link from "next/link";
import type { GetPostsResult } from "@wisp-cms/client";
import { formatFullDate } from "@/lib/date";
import { IPost } from "@/lib/types/IPost";

interface PostsPreviewProps {
    posts: IPost[]; // O componente recebe um array de posts
  }

export const PostList = ({ posts }: { posts: PostsPreviewProps["posts"] }) => {
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 px-4">
      {posts.map((post) => (
        <div className="break-words" key={post.id}>
          <Link key={post.id} href={`/posts/${post.id}`}>
            <div className="aspect-[16/9] relative">
              {post.image ? (
                <Image
                  alt={post.title}
                  className="object-cover"
                  src={post.image}
                  fill
                />
              ) : (
                <Image src="/placeholder.jpg" alt="placeholder" fill />
              )}
            </div>
          </Link>
          <div className="grid grid-cols-1 gap-3 md:col-span-2 mt-4">
            <h2 className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">
              <Link key={post.id} href={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <div className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
              {post.description}
            </div>
            <div className="flex items-center gap-2">
              
              <div className="font-medium">
                {post.author} | Published on{" "}
                
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
*/