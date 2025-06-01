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
      throw new UnauthorizedException();
    }
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    console.log('Payload:', payload); // Debugging line to check the payload

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}


// Warning
// Of course in a real application, you wouldn't store a password in plain text. You'd instead use a library like bcrypt, with a salted one-way hash algorithm. With that approach, you'd only store hashed passwords, and then compare the stored password to a hashed version of the incoming password, thus never storing or exposing user passwords in plain text. To keep our sample app simple, we violate that absolute mandate and use plain text. Don't do this in your real app!