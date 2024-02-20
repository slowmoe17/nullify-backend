import { Injectable, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { sendEmail } from 'src/utils/email.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repositoryUsers: Repository<User>,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = Number(process.env.SALT);
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const newUser = await this.repositoryUsers.create({
      ...createUserDto,
      password: hash,
    });
    this.repositoryUsers.save(newUser);
    const payload = { sub: newUser.id, email: newUser.email };
    return this.authService.genrateToken(payload);
  }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; user: any; refreshToken: any }> {
    const user = await this.repositoryUsers.findOneBy({ email: email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    const refreshToken = await this.authService.generateRefreshToken();
    return {
      user: user,
      refreshToken: refreshToken,
      access_token: await this.authService.genrateToken(payload),
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return this.repositoryUsers.findOneBy({ id: id });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, _updateUserDto: UpdateUserDto) {
    return this.repositoryUsers.update(id, _updateUserDto);
  }

  remove(id: number) {
    return this.repositoryUsers.delete(id);
  }
  async forgotPassword(email: string) {
    try {
      const emailSubject = 'Hello from Nest.js';
      const emailText = 'This is the email content.';
      const mail = await sendEmail(email, emailSubject, emailText);
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
