import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PostsRepository } from "@/repositories/PostsRepository";
import { PostsPreview } from "@/components/PostsPreview";

const postsRepository = new PostsRepository();

export default async function Page() {
  try {
    const posts = await postsRepository.getPosts(); // Obtém todos os posts

    return (
      <div className="container mx-auto px-5 mb-10">
        <Header />
        <p>Posts aqui</p>
        
        {/* Passando corretamente o array de posts */}
        
        <PostsPreview posts={posts} />

        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return <div>Erro ao carregar os posts.</div>;
  }
}
