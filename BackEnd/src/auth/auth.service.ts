import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(
    email: string,
    pass: string
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      console.log('Usuário não encontrado');
      throw new UnauthorizedException();
    }
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) {
      console.log('Senha incorreta');
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    console.log('Payload:', payload);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}