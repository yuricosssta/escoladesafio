// //Backend/src/users/schemas/user.schema.ts

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { HydratedDocument } from 'mongoose';
// import { IUser, UserRule } from './models/user.interface';
// import { string } from 'zod';

// export type UsersDocument = HydratedDocument<User>;

// @Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' } })
// export class User implements IUser {
//     @Prop({ type: mongoose.Schema.Types.ObjectId })
//     _id?: string;
//     @Prop({ required: true })
//     name: string;
//     @Prop({required: true, unique: true })
//     email: string; 
//     @Prop({ required: true })
//     password: string;
//     @Prop({ required: true })
//     rule: UserRule;
// }

// export const UsersSchema = SchemaFactory.createForClass(User);

// export const UsersSchemaOptions = {
//     collection: 'users',
//     timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' },
// };

// src/users/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser, UserRule } from './models/user.interface';

export type UsersDocument = HydratedDocument<User>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' } })
export class User implements IUser {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  rule: UserRule;
}

const UsersSchema = SchemaFactory.createForClass(User);

// hash da senha antes de salvar
UsersSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export { UsersSchema };
