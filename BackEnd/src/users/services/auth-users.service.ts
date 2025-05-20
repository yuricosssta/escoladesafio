import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { hash } from 'bcryptjs';

@Injectable()
export class AuthUsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async onModuleInit() {
    const adminExists = await this.userModel.findOne({ email: 'admin@admin.com' });

    if (!adminExists) {
      const password = '12345678';
      const hashedPassword = await hash(password, 10);

      const adminUser = new this.userModel({
        email: 'admin@admin.com',
        password: hashedPassword,
        name: 'Admin User',
        rule: 0,
      });

      await adminUser.save();
      console.log('Usuário admin criado com sucesso');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}