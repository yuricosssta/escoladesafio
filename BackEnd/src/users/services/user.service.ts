import { Injectable, NotFoundException } from '@nestjs/common';
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
        const newUser = await this.userRepository.createUser(user);
        console.log('Usuário criado:', newUser);
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
