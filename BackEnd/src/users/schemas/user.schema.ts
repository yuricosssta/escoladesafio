import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IUser, UserRule } from './models/user.interface';
import { string } from 'zod';

export type UsersDocument = HydratedDocument<User>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' } })
export class User implements IUser {
    // @Prop({ type: mongoose.Schema.Types.ObjectId })
    // id?: string;
    @Prop({ required: true })
    name: string;
    @Prop({required: true, unique: true })
    email: string; 
    @Prop({ required: true })
    password: string;
    @Prop({ required: true })
    rule: UserRule;
}

export const UsersSchema = SchemaFactory.createForClass(User);

export const UsersSchemaOptions = {
    collection: 'users',
    timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' },
};