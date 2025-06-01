import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from  './schemas/user.schema';
import { UsersService } from './services/user.service';
import { UsersMongooseRepository } from './repositories/mongoose/user.mongoose.repository';
import { UsersRepository } from './repositories/user.repository';
import { AuthUsersService } from '../auth/auth-users.service';
import { UsersController } from './controllers/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: UsersMongooseRepository,
    },
    AuthUsersService,
  ],
  exports: [UsersService, AuthUsersService],
})
export class UsersModule {}