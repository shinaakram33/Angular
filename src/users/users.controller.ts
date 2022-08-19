import { Controller, Post, Body, Param, UseGuards, Res, Delete, Put, HttpStatus, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/schemas/user.schema';
import { LoginUserDTO } from './dto/login-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from 'src//users/auth/jwt-auth.guard';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ValidatePincodeDto } from './dto/validate-pincode.dto';
import { identity } from 'rxjs';
import { GetUser } from './auth/GetUser.decorator';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
  ) { }

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log('createUserDto', createUserDto)
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDTO) {
    return this.usersService.login(loginUserDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Post('resetPassword/:_id')
  async resetPass(@Param('_id') id, @Body() resetPasswordDto: ResetPasswordDto) {
    return this.usersService.resetPass(resetPasswordDto, id);
  }

  @Post('forgetPassword')
  async forgetPass(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.usersService.forgetPass(forgetPasswordDto);
  }

  @Get('validate/:pincode')
  async validatePincode(@Param('pincode') pincode) {
    return this.usersService.validatePincode(parseInt(pincode));
  }

  @Post('setNewPassword/:pincode')
  async setNewPassword(@Param('pincode') pincode, @Body() validatePincodeDto: ValidatePincodeDto) {
    return this.usersService.setNewPassword(validatePincodeDto, parseInt(pincode));
  }


  @Get('getall')
  async fetchAll(@Res() response) {
    const users = await this.usersService.readAll();
    return response.status(HttpStatus.OK).json({
      users
    })
  }

  @Get('getOne/:id')
  async findById(@Res() response, @Param('id') id) {
    const user = await this.usersService.readById(id);
    return response.status(HttpStatus.OK).json({
      user
    })
  }

  @Put('update/:id')
  async update(@Res() response, @Param('id') id, @Body() user: User) {
    const updateUser = await this.usersService.update(id, user);
    return response.status(HttpStatus.OK).json({
      updateUser
    })
  }

  @Delete('delete/:id')
  async delete(@Res() response, @Param('id') id) {
    const deleteUser = await this.usersService.delete(id);
    return response.status(HttpStatus.OK).json({
      deleteUser
    })
  }

  @Post('admin/addnewuser')
  async addUserByAdmin(@Body() createUserDto: CreateUserDto, @GetUser() user:User){
    return await this.usersService.addUserByAdmin(createUserDto, user);
  }

  @Post('admin/updateuser/:id')
  async updateUserByAdmin(@Body() updateUserDto: UpdateUserDto, @GetUser() user:User, @Param('id') id){

  }

  @Post('admin/deleteuser/:id')
  async deleteUserByAdmin(@GetUser() user:User, @Param('id') id){
    return await this.usersService.deleteUserByAdmin(user, id);
  }
}
