// post.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { z } from 'zod';
import { ZodValidationPipe } from '../../shared/pipe/zod-validation.pipe';
import { ApiBody } from '@nestjs/swagger';
import { LoggingInterceptor } from '../../shared/interceptors/logging.interceptor';
import { IUser } from '../../users/schemas/models/user.interface';
import { GetUser } from '../../shared/decorators/get-user-decorator';
import { AuthGuard } from '../../auth/auth.guard';


const createPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  created_at: z.coerce.date().optional(),//z.date().optional(),
  modified_at: z.coerce.date().optional(),//z.date().optional(),
  image: z.string().optional(),
  author: z.string().optional(),
  published: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),

});

const updatePostSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  modified_at: z.coerce.date().optional(),//z.date().optional(),
  image: z.string().optional(),
  author: z.string().optional(),
  published: z.boolean().optional(),
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

  // @Get()
  // async getAllPosts() {
  //   return this.postService.getAllPosts();
  // }
  @Get()
  async getAllPosts(
    // Captura 'page' e 'limit' da URL. Define valores padrão se não forem fornecidos.
    // ParseIntPipe converte a string da URL para número.
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST, optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST, optional: true })) limit: number = 10,
  ) {
    // Garante que o limite não seja excessivo
    if (limit > 100) {
      limit = 100;
    }
    return this.postService.getAllPosts(page, limit);
  }


  @Get('search')
  async searchPost(@Query('term') term: string) {
    return this.postService.searchPost(term);
  }

  @Get(':postId')
  async getPost(@Param('postId') postId: string) {
    return this.postService.getPost(postId);
  }

  @UseGuards(AuthGuard)
  @Post() 
  async createPost(@Body(new ZodValidationPipe(createPostSchema))
  { title, description, content, image, author }: CreatePost
  ) {

    const postData = { title, description, content, image, author };
    console.log('Dados recebidos:', postData);
    return this.postService.createPost({
      title, description,
      content,
      created_at: new Date(),
      modified_at: new Date(),
      image,
      author,//user.name, //colocar o nome do autor automaticamente
      published: true,
    });
  }

  // @Post()
  // // @ApiBody(SwaggerCreatePostSchema)
  // async createPost(@Body(new ZodValidationPipe(createPostSchema))
  // { title, description, content, image, author }: CreatePost,
  //   @GetUser() user: IUser
  // ) {
  //     if (!user) {
  //       throw new UnauthorizedException('Usuário não autenticado');
  //     }
  //   const postData = { title, description, content, image, author };
  //   console.log('Dados recebidos:', postData);
  //   return this.postService.createPost({
  //     title, description,
  //     content,
  //     created_at: new Date(),
  //     modified_at: new Date(),
  //     image,
  //     author: user.name, //colocar o nome do autor automaticamente
  //     published: true,
  //   }, user);
  // }


  @UseGuards(AuthGuard)
  @Put(':postId')
  async updatePost(
    @Param('postId') postId: string,
    @Body(new ZodValidationPipe(updatePostSchema))
    { title, description, content, modified_at, image, author, published }: UpdatePost,
  ) {
    return this.postService.updatePost(postId, { title, description, content, modified_at, image, author, published });
  }

  @UseGuards(AuthGuard)
  @Delete(':postId')
  async deletePost(@Param('postId') postId: string) {
    return this.postService.deletePost(postId);
  }
}
