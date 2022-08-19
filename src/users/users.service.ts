import { Model } from 'mongoose';
import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ValidatePincodeDto } from './dto/validate-pincode.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

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
        throw new BadRequestException(err.message)
      }
    } else {
      throw new ConflictException('User already Exist')
    }
  }

  async login(userCredentials: LoginUserDTO): Promise<any> {
    const { email, password } = userCredentials
    const user: any = await this.userModel.findOne({ email })
    if (user && await bcrypt.compare(password, user.password)) {
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


  async resetPass(resetPasswordDto: ResetPasswordDto, id: any): Promise<any> {
    const { oldPassword, newPassword, confirmPassword } = resetPasswordDto

    const user: any = await this.userModel.findById(id)
    if (user && bcrypt.compare(oldPassword, user.password)) {

      if (newPassword === confirmPassword) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        const newa = await this.userModel.updateOne({ _id: user.id }, { password: hashedPassword });
        let obj = {
          "status": 200,
          "message": "Password has been reset"
        }
        return obj;
      }
      else {
        throw new BadRequestException("Passwords do not match")
      }
    }
    else {
      if (!user) {
        throw new NotFoundException("User does not exist")
      }
      else {
        throw new ConflictException("Incorrect password")
      }
    }
  }

  async forgetPass(forgetPasswordDto: ForgetPasswordDto): Promise<any> {
    const { email } = forgetPasswordDto
    const user: any = await this.userModel.findOne({ email })
    if (user) {
      const code = Math.floor(1000 + Math.random() * 9000);
      await this.userModel.updateOne({_id: user._id}, { pinCode: code });
      return `Your Pin code is ${code}`
    }
    else {
      throw new NotFoundException('Incorrect email')
    }
  }

  async validatePincode(pincode: number) {
    const user: any = await this.userModel.findOne({ pinCode: pincode })
    if (pincode === user.pinCode) {
      return "Pincode verified";
    }
    else {
      throw new BadRequestException("Incorrect code")
    }
  }

  async setNewPassword(validatePincodeDto: ValidatePincodeDto, pincode: number) {
    console.log('pincode', pincode)
    const { newPassword, confirmPassword } = validatePincodeDto
    const user: any = await this.userModel.findOne({ pinCode: pincode })
    console.log('user', user)
    if (pincode === user.pinCode && newPassword === confirmPassword) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt)
      const news = await this.userModel.updateOne({ _id: user._id }, { password: hashedPassword });
      // console.log('news', news)
      let obj = {
        "status": 200,
        "message": "Password has been set"
      }

      return obj;;
    }
    else {
      if (pincode !== user.pinCode) {
        throw new BadRequestException('Incorrect code')
      }
      else {
        throw new ConflictException('Passwords do not match')
      }
    }
  }

  async readAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async readById(id): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async update(id, book: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, book, { new: true })
  }

  async delete(id): Promise<any> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async addUserByAdmin(createUserDto: CreateUserDto, user:User){
      //check if user is admin
      //if yes then create user
      //else throw an exception
      try{
        console.log(user);
        if(user.role == 'ADMIN'){
          return this.create(createUserDto);
        }else{
          throw new UnauthorizedException('Unauthorized User');
        }

      }catch(error){
        throw new BadRequestException(error.message);
      }
  }

  async updateUserByAdmin(updateUserDto: UpdateUserDto, user:User, userId){
      //check if user is admin
      //if yes then check if user exists
      //if yes then update user details
      //else throw an exception
      try {
        if (user.role == 'ADMIN') {
          const userExists = await this.userModel.findById(userId.toString());
          if (!userExists) {
            throw new NotFoundException(`User with id ${userId} does not exists`);
          }
          if(updateUserDto.email) {
            updateUserDto.email = updateUserDto.email.toLowerCase();
          }
          return await this.userModel.findOneAndUpdate({_id: userId}, updateUserDto, {
            new: true,
          });
        } else {
          throw new UnauthorizedException('Unauthorized User');
        }
      } catch (error) {
        throw new BadRequestException(error.message);
      }
  }

  async deleteUserByAdmin(user: User, userId){
      //check if user is admin
      //if yes then check if user exists
      //if yes then delete the user
      //else throw an exception
      try{
        if(user.role == 'ADMIN'){
          const userExists = await this.userModel.findById(userId.toString());
          if (!userExists) {
            throw new NotFoundException(`User with id ${userId} does not exists`);
          }
          return this.delete(userId);
        }else{
          throw new UnauthorizedException('Unauthorized User');
        }
      }catch(error){
        throw new BadRequestException(error.message);
      }
  }

}