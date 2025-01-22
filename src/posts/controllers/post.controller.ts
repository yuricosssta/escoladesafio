import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';
import { ApiBody } from '@nestjs/swagger';

const createPostSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const updatePostSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

type CreatePost = z.infer<typeof createPostSchema>;
type UpdatePost = z.infer<typeof updatePostSchema>;

const SwaggerCreatePostSchema = {
  schema: {
    type: 'object',
    properties: {
      title: { type: 'string', example: 'Teste postagem' },
      description: { type: 'string', example: 'Descrição da postagem teste' },
    },
    required: ['title', 'description'],
  },
};

@UseInterceptors(LoggingInterceptor)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  // @UseGuards(AuthGuard)
  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }
  @Get('search')
  async searchPost(@Query('term') term: string) {
    return this.postService.searchPost(term);
  }
  @Get(':postId')
  async getPost(@Param('postId') postId: string) {
    return this.postService.getPost(postId);
  }
  @UsePipes(new ZodValidationPipe(createPostSchema))
  @Post()
  @ApiBody(SwaggerCreatePostSchema)
  async createPost(@Body() { title, description }: CreatePost) {
    return this.postService.createPost({ title, description });
  }
  @Put(':postId')
  async updatePost(
    @Param('postId') postId: string,
    @Body(new ZodValidationPipe(updatePostSchema))
    { title, description }: UpdatePost,
  ) {
    return this.postService.updatePost(postId, { title, description });
  }
  @Delete(':postId')
  async deletePost(@Param('postId') postId: string) {
    return this.postService.deletePost(postId);
  }
}
