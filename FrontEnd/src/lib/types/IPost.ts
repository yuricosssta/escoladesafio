
export interface IPost {
  id: string;
  title: string;
  content?: string; // Adicionei content (pode ser markdown/HTML)
  description: string;
  created_at: Date;
  modified_at?: Date;
  image?: string;
  author?: string;
  published?: boolean;
}