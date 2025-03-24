import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PostsRepository } from "@/repositories/PostsRepository";
import { PostsPreview } from "@/components/PostsPreview";
import NotFound from "./not-found";
import { PostList } from "@/components/PostList";

const postsRepository = new PostsRepository();

export default async function Page() {
  try {
    const result = await postsRepository.getPosts(); // Obtém todos os posts

    return (
      <div className="container mx-auto px-5 mb-10">
        <Header />
        <p>Posts aqui</p>
        <PostList posts={result} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return (
      <div className="container mx-auto px-5 mb-10">
        <Header />
        <NotFound />
        <Footer />
      </div>

    )
  }
}