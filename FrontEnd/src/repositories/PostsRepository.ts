import { IPost } from "@/lib/types/IPost";

export class PostsRepository {
  private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    if (!this.baseUrl) {
      throw new Error("API base URL não configurada");
    }

    const response = await fetch(`${this.baseUrl}${url}`, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Falha na requisição");
    }

    return response.json();
  }

  getRequestHeaders(): RequestInit {
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async getPosts(): Promise<IPost[]> {
    try {
      const data = await this.request<any[]>("/posts", this.getRequestHeaders());
      
      // Mapeamento seguro dos dados
      return data.map(item => this.transformPost(item));
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      return [];
    }
  }

  async getPost(id: string): Promise<IPost | null> {
    if (!id) {
      console.error("ID inválido fornecido");
      return null;
    }

    try {
      const data = await this.request<any>(`/posts/${id}`, this.getRequestHeaders());
      return this.transformPost(data);
    } catch (error) {
      console.error(`Erro ao buscar post ${id}:`, error);
      return null;
    }
  }

  // Método para transformar dados brutos em IPost
  private transformPost(data: any): IPost {
    if (!data.id && !data._id) {
      console.warn("Post sem ID encontrado:", data);
      throw new Error("Dados do post inválidos: ID ausente");
    }

    return {
      id: data.id || data._id, // Suporta tanto 'id' quanto '_id'
      title: data.title || "",
      description: data.description || "",
      created_at: data.created_at ? new Date(data.created_at) : new Date(),
      modified_at: data.modified_at ? new Date(data.modified_at) : undefined,
      image: data.image || undefined,
      author: data.author || undefined,
    };
  }
}


/*
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
  }

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
  }


}*/
