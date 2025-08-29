import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostsSchema } from './schemas/post.schema';
import { PostRepository } from './repositories/post.repository';
import { PostMongooseRepository } from './repositories/mongoose/post.mongoose.repository';
import { PostService } from './services/post.service';
import { PostController } from '../api/post.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostsSchema,
      },
    ]),
    AuthModule,
  ],
  providers: [
    {
      provide: PostRepository,
      useClass: PostMongooseRepository,
    },
    PostService,
  ],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}