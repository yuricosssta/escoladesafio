import { IPost } from "@/lib/types/IPost";
import PostPreview from "@/components/PostPreview";
import { cn } from "@/lib/utils";

interface PostsPreviewProps {
  posts: IPost[]; // O componente recebe um array de posts
}

export function PostsPreview({ posts }: PostsPreviewProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-16 lg:gap-28 md:grid-cols-2 md:my-16 my-8")}>
      {posts.length > 0 ? (
        posts.map((posts) => (
          
          <a key={posts.id} href={`/posts/${posts.id}`} >            
            <PostPreview key={posts.id} post={posts} />
          </a> 
        ))
      ) : (
        <p>Nenhum post encontrado.</p>
      )}
    </div>
  );
}