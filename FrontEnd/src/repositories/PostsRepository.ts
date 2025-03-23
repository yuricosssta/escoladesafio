import { IPost } from "@/lib/types/IPost";

export class PostsRepository {
  private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  //private authToken = process.env.TMDB_API_TOKEN ?? "";

  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, options);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Falha na requisição dos dados.");
    }

    return data;
  }

  getRequestHeaders() {
    return {
      method: "GET",
      headers: {
        accept: "application/json",
        //Authorization: `Bearer ${this.authToken}`,
      },
    } as RequestInit;
  }

  async getPosts(): Promise<IPost[]> {
    return this.request<IPost[]>("/posts", this.getRequestHeaders());
  }


  /*async getPost(id: string | number){
    const posts = await this.request<IPost>(
      `/posts/${id}`,
      this.getRequestHeaders()
    );

    return posts;
  }*/

    async getPost(id: string | number): Promise<IPost | null> {
      if (!id || typeof id !== "string") {  // 🔹 Garante que ID seja uma string válida
        console.error("Erro: ID inválido passado para getPost.", id);
        return null;
      }
    
      if (!this.baseUrl) {
        console.error("Erro: NEXT_PUBLIC_API_BASE_URL não está definido.");
        throw new Error("Erro interno: URL da API não configurada.");
      }
    
      try {
        const post = await this.request<IPost>(`/posts/${id}`, this.getRequestHeaders());
    
        if (!post) {
          console.warn(`Post com ID ${id} não encontrado.`);
          return null;
        }
    
        return post;
      } catch (error) {
        console.error(`Erro ao buscar post ${id}:`, error);
        return null;
      }
    }

  /*async searchPost(query: string) {
    const posts = await this.request<TTMDBApiResponse>(
      `/search/movie?query=${query}&language=pt-BR`,
      this.getRequestHeaders()
    );
 
    return movies;
  }
 
  async getFeaturedMovies() {
    const movies = await this.request<TTMDBApiResponse>(
      `/movie/popular?language=pt-BR`,
      this.getRequestHeaders()
    );
 
    return movies;
  }
 
  async getTopRatedMovies() {
    const movies = await this.request<TTMDBApiResponse>(
      `/movie/top_rated?language=pt-BR`,
      this.getRequestHeaders()
    );
 
    return movies;
  }*/


}