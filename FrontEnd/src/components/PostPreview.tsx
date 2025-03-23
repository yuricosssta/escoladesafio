import { IPost } from "@/lib/types/IPost";
import Image from "next/image";
import Link from "next/link";


export default function PostPreview({ post }: { post: IPost }) {
  return (
    <div className="break-words border p-4 rounded-lg shadow-md">
      <Link href={`/posts/${post.id}`}>
        <div className="aspect-[16/9] relative">
          <Image
            alt={post.title}
            className="object-cover"
            src={post.image || "/images/placeholder.webp"}
            fill
          />
        </div>
      </Link>
      <div className="mt-4">
        <h2 className="font-bold text-xl">
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </h2>
        <p className="text-gray-600">{post.description}</p>
      </div>
    </div>
  );
}


//  {/*{post.modified_at || post.created_at
 //             ? format(new Date(post.modified_at || post.created_at), "dd MMMM yyyy")
 //             : "Data não disponível"}*/}