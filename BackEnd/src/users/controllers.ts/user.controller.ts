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
import { UserService } from '../services/user.service';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';
import { ApiBody } from '@nestjs/swagger';
import { UserRole } from '../schemas/models/user.interface';

const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    rule: z.nativeEnum(UserRole),
});

const updateUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    rule: z.nativeEnum(UserRole),
});

type CreateUser = z.infer<typeof createUserSchema>;
type UpdateUser = z.infer<typeof updateUserSchema>;

const SwaggerCreateUserSchema = {
    schema: {
        type: 'object',
        properties: {
            name: { type: 'string', example: 'Teste' },
            email: { type: 'string', example: 'email@gmail.com' },
            password: { type: 'string', example: '123456' },
            rule: { type: 'string', example: 'admin' },
        },
        required: ['name', 'email', 'password', 'rule'],
    },
};

@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class usersController {
    constructor(private readonly userService: UserService) { }
    // @UseGuards(AuthGuard)
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

    @UsePipes(new ZodValidationPipe(createUserSchema))
    @Post()
    @ApiBody(SwaggerCreateUserSchema)
    async createUser(@Body() { name, email, password, rule }: CreateUser) {
        const userData = { name, email, rule };
        console.log('Dados recebidos:', userData);
        return this.userService.createUser({
            name,
            email,
            password,
            rule,
        });
    }



    @Put(':userId')
    async updateUser(
        @Param('userId') userId: string,
        @Body(new ZodValidationPipe(updateUserSchema))
        { name, email, password, rule }: UpdateUser,
    ) {
        return this.userService.updateUser(userId, { name, email, password, rule });
    }

    @Delete(':userId')
    async deleteUser(@Param('userId') userId: string) {
        return this.userService.deleteUser(userId);
    }
}
