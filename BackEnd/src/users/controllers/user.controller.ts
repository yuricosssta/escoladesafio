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
import { AdminGuard } from '../../auth/admin.guard';

@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
 
  @Get('search')
  async searchUser(@Query('term') term: string) {
    return this.userService.searchUser(term);
  }
  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }
  @UseGuards(AdminGuard)
  @Post()
  async createUser(
    @Body(new ZodValidationPipe(createUserSchema)) user: CreateUser,
  ) {
    return this.userService.createUser(user);
  }
  @UseGuards(AdminGuard)
  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body(new ZodValidationPipe(updateUserSchema))
    { name, isAdmin, rule }: UpdateUser,
  ) {
    return this.userService.updateUser(userId, { name, isAdmin, rule });
  }
  @UseGuards(AdminGuard)
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}