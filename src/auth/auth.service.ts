import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Cursor, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    // @InjectModel(user.name) private userModel: Model<UserDocument>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private createUserDto: CreateUserDto,

  ) {}

  // async validateUser(email: string, pass: string): Promise<any> {
  //   const user = await this.usersService.readByEmail(email);
  //   console.log('user', user)
  //   // if (user && user.password === pass) {
  //   //  // const { password, ...result } = user;
  //   //   return true;
  //   // }
  //   return null;
  // }

  // async login(userCredentials: LoginUserDTO) {
  //   console.log('user login', userCredentials)
  //   const user = await this.userModel.findOne({email: userCredentials.email})
  //   // if (user)
  //   console.log('user', user)
  //   // const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
  
}
