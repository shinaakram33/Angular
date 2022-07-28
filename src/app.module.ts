import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb+srv://thealitahir:punjabf13@cluster0.qbtub.azure.mongodb.net/authentication')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
