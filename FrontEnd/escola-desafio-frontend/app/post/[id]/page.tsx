import { BlogPostContent } from "@/components/BlogPostContent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PostsRepository } from "@/repositories/PostsRepository";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ postId: string }>
};

const postRepository = new PostsRepository();

export default async function Page({ params }: PageProps) {
  const { postId } = await params;
  const post = await postRepository.getPost(postId);

  return (
    <>
      <script
        type="application/ld+json"
      //dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-5">
        <Header />
        <div className="max-w-prose mx-auto text-xl">
          <BlogPostContent post={post} />

        </div>
        <Footer />
      </div>
    </>
  );
};