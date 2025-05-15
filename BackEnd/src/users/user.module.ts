import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from './schemas/user.schema';
import { UserRepository } from './repositories/user.repository';
import { UserMongooseRepository } from './repositories/mongoose/user.mongoose.repository';
import { UserService } from './services/user.service';
import { usersController } from './controllers.ts/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UsersSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserMongooseRepository,
    },
    UserService,
  ],
  controllers: [usersController],
})
export class UserModule {}
