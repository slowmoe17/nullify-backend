import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const access_token = await this.usersService.create(createUserDto);
    return { access_token: access_token };
  }

  @Post('/signIn')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.usersService.signIn(signInDto.email, signInDto.password);
  }

  @Get()
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
  }

  @Get('/forgotPassword/:email')
  forgotPassword(@Param('email') email: string, @Res() res: Response) {
    this.usersService.forgotPassword(email);
    res.status(200).send('done');
  }
}
 