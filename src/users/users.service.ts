/*import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';*/

import { Model } from 'mongoose';
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: createUserDto.email })
    if (!user) {
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt)
      try {
        return this.userModel.create({ ...createUserDto, password: hashedPassword });
      } catch (err) {
        console.log('err -> ', err)
        throw new BadRequestException(err.message)
      }
    } else {
      throw new ConflictException('User already Exist')
    }
  }

  async login(userCredentials: LoginUserDTO): Promise<any> {
    const { email, password } = userCredentials
    const user: any = await this.userModel.findOne({ email: email })
    if (user && bcrypt.compare(password, user.password)) {
      const payload: { email: string } = {
        email
      }
      const accessToken: string = this.jwtService.sign(payload)
      return {
        data: user,
        accessToken: accessToken
      }
    } else {
      throw new UnauthorizedException('Please check you login credentials')

    }
  }


  // async readByEmail(email): Promise<User> {
  //   const { MongoClient } = require("mongodb");
  //   const uri = "mongodb+srv://thealitahir:punjabf13@cluster0.qbtub.azure.mongodb.net/authentication";
  //   const client = new MongoClient(uri);
  //   const db = client.db("authentication;")
  //   const coll = db.collection("users");
  //   const cursor = coll.find();
  //   client.close();
  //   return cursor.forEach(user => cursor.email === email);
  //   //return await this.userModel.find(email).exec();
  // }





  /*findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }*/
}
