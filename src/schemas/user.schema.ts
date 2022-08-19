import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { Document } from 'mongoose';

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @IsEmail()
  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop()
  role: Role;

  @Prop()
  pinCode: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
