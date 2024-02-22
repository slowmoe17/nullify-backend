import {
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const access_token = await this.authService.genrateToken(payload);
    const refresh_token = await this.authService.generateRefreshToken(
      newUser.id,
    );
    return {
      access_token,
      refresh_token,
    };
  }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; user: any; refresh_token: string }> {
    const user = await this.repositoryUsers.findOneBy({ email: email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    const access_token = await this.authService.genrateToken(payload);
    const refresh_token = await this.authService.generateRefreshToken(user.id);

    return {
      user: user,
      refresh_token: refresh_token,
      access_token: access_token,
    };
  }

  async refreshToken(oldRefreshToken: string) {
    const userId = await this.authService.decodeRefreshToken(oldRefreshToken);
    console.log(userId);
    const newAccessToken = await this.authService.genrateToken(userId);
    return {
      newAccessToken: newAccessToken,
    };
    // const newRefreshToken = await this.authService.generateRefreshToken(userId);
  }

  async findAll() {
    return await this.repositoryUsers.find();
  }

  findOne(id: number) {
    return this.repositoryUsers.findOneBy({ id: id });
  }

  findOneByEmail(email: string) {
    return this.repositoryUsers.findOneBy({ email: email });
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
      const user = await this.findOneByEmail(email);
      if (!user) {
        console.log(user);
        return false;
      } else {
        const access_token = await this.authService.genrateToken({
          sub: user.id,
          email: user.email,
        });
        const emailSubject = 'Password Reset Email';
        const emailText = `${process.env.BASE_URL}/forgotpassword?email=${user.email}&key=${access_token}`;
        const mail = await sendEmail(email, emailSubject, emailText);
        return true;
      }
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
