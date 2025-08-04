// post.repository.ts

import { IPost } from '../schemas/models/post.interface';
import { PaginateOptions } from './mongoose/post.mongoose.repository';

export abstract class PostRepository {
  // abstract getAllPosts(): Promise<IPost[]>;
  abstract getAllPosts(options: PaginateOptions): Promise<IPost[]>;
  abstract getTotalPostsCount(): Promise<number>;
  abstract getPost(postId: string): Promise<IPost>;
  abstract createPost(post: IPost): Promise<void>;
  abstract searchPost(term: string): Promise<IPost[]>;

  abstract updatePost(
    postId: string,
    post: Partial<IPost>,
  ): Promise<IPost | null>;

  abstract deletePost(postId: string): Promise<IPost | null>;
}
