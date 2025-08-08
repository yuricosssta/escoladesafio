import { BlogPostContent } from "@/components/BlogPostContent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PostsRepository } from "@/repositories/PostsRepository";
import { notFound } from "next/navigation";
import { NotFound } from "@/components/NotFound";


type PageProps = {
  params: Promise<{ id: string }>
};

const postRepository = new PostsRepository();

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const post = await postRepository.getPost(id); 

  return (
    <>
      <script
        type="application/ld+json"
      //dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-5">
        <Header />
        <div className="max-w-prose mx-auto text-xl">
        {post ? <BlogPostContent post={post} /> : <NotFound />}
        </div>
        <Footer />
      </div>
    </>
  );
};