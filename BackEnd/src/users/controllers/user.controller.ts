//BackEnd/src/users/controllers/user.controller.ts

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
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';
import { LoggingInterceptor } from '../../shared/interceptors/logging.interceptor';
import { UsersService } from '../services/user.service';
import {
  CreateUser,
  createUserSchema,
  UpdateUser,
  updateUserSchema,
} from '../validations/users.zod';
import { IUser } from '../schemas/models/user.interface';
import { GetUser } from '../../shared/decorators/get-user-decorator';
import { AuthGuard } from 'src/auth/auth.guard';


@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get('search')
  async searchUser(@Query('term') term: string) {
    return this.userService.searchUser(term);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@GetUser('sub') userId: string) {
    return this.userService.getUser(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createUser(
    @Body(new ZodValidationPipe(createUserSchema)) user: CreateUser,
  ) {
    return this.userService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body(new ZodValidationPipe(updateUserSchema))
    { name, isAdmin, rule }: UpdateUser,
  ) {
    return this.userService.updateUser(userId, { name, isAdmin, rule });
  }

  @UseGuards(AuthGuard)
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}