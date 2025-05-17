//BackEnd/src/user/repositories/mongoose/user.mongoose.repository.ts

import { IUser } from '../../schemas/models/user.interface';
import { UserRepository } from '../user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { Model } from 'mongoose';

export class UserMongooseRepository implements UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }
    getAllUsers(): Promise<IUser[]> {
        return this.userModel.find({});
    }

    searchUser(term: string): Promise<IUser[]> {
        const regex = new RegExp(term, 'i');
        return this.userModel
            .find({
                $or: [{ name: regex }, { email: regex }, { role: regex }],
            })
            .exec();
    }

    getUser(userId: string): Promise<IUser> {
        return this.userModel.findById(userId).exec();
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.userModel.findOne({ email }).exec();
    }


    async createUser(user: IUser): Promise<IUser> {
        try {
            const newUser = new this.userModel(user);
            await newUser.save();
            // console.log('Usuário criado dentro do user.mongoose.repository: ', newUser);
            //     const createUser = new this.userModel(user);        
            // await createUser.save();
            return newUser; 

        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
            throw error;
        }
    }

    async updateUser(
        userId: string,
        user: Partial<IUser>,
    ): Promise<IUser | null> {
        const updateData = Object.fromEntries(
            Object.entries(user).filter(([, value]) => value !== undefined),
        );

        const result = await this.userModel
            .findOneAndUpdate({ _id: userId }, { $set: updateData }, { new: true })
            // .findOneAndUpdate({ id: postId }, { $set: updateData }, { new: true }) 
            .exec();

        return result;
    }
    async deleteUser(userId: string): Promise<IUser | null> {
        const result = this.userModel.findByIdAndDelete({ _id: userId }).exec();
        // const result = this.postModel.findByIdAndDelete({ id: postId }).exec();

        return result;
    }
}
