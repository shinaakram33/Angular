import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { Document } from 'mongoose';
// import { User } from 'src/users/entities/user.entity';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
