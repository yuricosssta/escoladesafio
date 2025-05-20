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
import { ApiBody } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';
import { GetUser } from 'src/shared/decorators/get-user-decorator';
import { IUser } from 'src/users/schemas/models/user.interface';
import { Public } from 'src/shared/decorators/public.decorator';

const createPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  created_at: z.date().optional(),
  modified_at: z.date().optional(),
  image: z.string().optional(),
  author: z.string().optional(),
  published: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),

});

const updatePostSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  modified_at: z.string().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
});

type CreatePost = z.infer<typeof createPostSchema>;
type UpdatePost = z.infer<typeof updatePostSchema>;

const SwaggerCreatePostSchema = {
  schema: {
    type: 'object',
    properties: {
      title: { type: 'string', example: 'Teste postagem' },
      description: { type: 'string', example: 'Descrição da postagem teste' },
      content: { type: 'string', example: 'Conteudo da postagem teste' },

    },
    required: ['title', 'description', 'content'],
  },
};

@UseInterceptors(LoggingInterceptor)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }
  // @UseGuards(JwtAuthGuard)
  @Public() 
  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }
  @Public()
  @Get('search')
  async searchPost(@Query('term') term: string) {
    return this.postService.searchPost(term);
  }
  @Public()
  @Get(':postId')
  async getPost(@Param('postId') postId: string) {
    return this.postService.getPost(postId);
  }

  
  @Post()
  @ApiBody(SwaggerCreatePostSchema)
  async createPost(@Body(new ZodValidationPipe(createPostSchema))
  { title, description, content, image, author }: CreatePost,
    @GetUser() user: IUser) {
    const postData = { title, description, content, image, author };
    console.log('Dados recebidos:', postData);
    return this.postService.createPost({
      title, description,
      content,
      created_at: new Date(),
      modified_at: new Date(),
      image,
      author, //colocar o nome do autor automaticamente
      published: true,
    }, user);
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
