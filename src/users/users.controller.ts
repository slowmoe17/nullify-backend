import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersService.findOneByEmail(createUserDto.email);
      if (user) {
        res.status(301).send({ message: 'Email is already in use.' });
      } else {
        const access_token = await this.usersService.create(createUserDto);
        res.status(200).send({
          status: HttpStatus.CREATED,
          message: 'User created successfully.',
          access_token: access_token,
        });
      }
    } catch (error) {
      res.status(500).send({ message: 'server error' })
    }
  }

  @Post('/signIn')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.usersService.signIn(signInDto.email, signInDto.password);
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const users = await this.usersService.findAll();
      res.status(200).send({
        users: users
      })
    } catch (error) {
      res.status(500).send({
        message: 'server error'
      })
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(+id);
      if (!user) {
        res.status(404).send(`not found user with id ${id}`);
      } else {
        res.status(200).send(user);
      }
    } catch (error) {
      res.status(500).send('server error happned')
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const updateUser = await this.usersService.update(+id, updateUserDto);
      if (!updateUser.affected) {
        res.status(404).send(`not found user with id ${id}`)
      } else {
        res.status(200).send('user upadted successfully')
      }
    } catch (error) {
      res.status(500).send('server error happned')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.usersService.remove(+id);
      if (!result.affected) {
        res.status(404).send(`not found user with id+${id}`)
      } else {
        res.status(200).send('user deleted succesfully')
      }

    } catch (error) {
      res.status(500).send('Internal server error');
    }

  }

  @Get('/forgotPassword/:email')
  async forgotPassword(@Param('email') email: string, @Res() res: Response) {
    const result = await this.usersService.forgotPassword(email);
    if (!result) {
      res.status(404).send({
        message: 'Not Found user with  Email'
      });
    } else {
      res.status(200).send({
        message: 'The mail Sended to User'
      });
    }

  }
}
