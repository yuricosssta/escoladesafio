// components/PostContent.tsx
import { IPost } from "@/lib/types/IPost";

interface PostContentProps {
  post: IPost;
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover mb-4"
        />
      )}
      <p className="text-gray-600 mb-4">Por {post.author}</p>
      <div className="prose">
        <p>{post.description}</p>
      </div>
    </div>
  );
}