import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/schemas/user.schema';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { LocalAuthGuard } from 'src/auth/local-auth.guard';
// import { AuthService } from 'src/auth/auth.service';
import { LoginUserDTO } from './dto/login-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    // private authService: AuthService
    ) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log('createUserDto', createUserDto)
    return this.usersService.create(createUserDto);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDTO) {
    return this.usersService.login(loginUserDto);
  }


  /*@Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }*/
}
