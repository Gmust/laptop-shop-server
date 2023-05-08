import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {
  }

  async validateOne(username: string, password: string) {
    const user = await this.usersService.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    if (user && passwordCompare) {
      return {
        userId: user.id,
        username: user.username,
        email: user.email
      };
    }

    return null;
  }
}
