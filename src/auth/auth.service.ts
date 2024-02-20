import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}


  async genrateToken(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  async generateRefreshToken() {
    const refreshToken = uuidv4();
    return refreshToken;
  }
}
