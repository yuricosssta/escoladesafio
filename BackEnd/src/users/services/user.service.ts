//BackEnd/src/users/controllers/user.controller.ts

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '../schemas/models/user.interface';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }
    async getAllUsers() {
        const users = await this.userRepository.getAllUsers();
        return users;
    }
    async searchUser(term: string) {
        const user = this.userRepository.searchUser(term);

        return user;
    }
    async getUser(userId: string) {
        const user = await this.userRepository.getUser(userId);

        if (!user) throw new NotFoundException('Usuário não encontrado');
        return user;
    }

    async createUser(user: IUser) {
        const existingUser = await this.userRepository.findByEmail(user.email); 
        if (existingUser) {
            throw new ConflictException('E-mail já cadastrado.');
        }

        const newUser = await this.userRepository.createUser(user);
        return newUser;
    }

    async updateUser(userId: string, user: Partial<IUser>) {
        const updatedUser = await this.userRepository.updateUser(userId, user);

        if (!updatedUser) throw new NotFoundException('Usuário não encontrado');
        return updatedUser;
    }

    async deleteUser(userId: string) {
        const deletedUser = await this.userRepository.deleteUser(userId);

        if (!deletedUser) throw new NotFoundException('Usuário não encontrado');
        return { message: `Usuário com id ${userId} deletado com sucesso.` };
    }
}
