import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://thealitahir:punjabf13@cluster0.qbtub.azure.mongodb.net/authentication',
    ),
  ],
})
export class AppModule { }
