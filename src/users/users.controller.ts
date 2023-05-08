import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from '../auth/localAuth.guard';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { LoginCheckResponse, LoginUserRequest, LoginUserResponse, LogoutUserResponse, SignupResponse } from './types';

@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) {
  }

  @Post('/signup')
  @ApiOkResponse({ type: SignupResponse })
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBody({ type: LoginUserRequest })
  @ApiOkResponse({ type: LoginUserResponse })
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Request() req) {
    return { user: req.user, msg: 'Logged in!' };
  }


  @Post('/login-check')
  @ApiOkResponse({ type: LoginCheckResponse })
  @UseGuards(AuthenticatedGuard)
  loginCheck(@Request() req) {
    return req.user;
  }

  @Post('/logout')
  @ApiOkResponse({ type: LogoutUserResponse })
  logout(@Request() req) {
    req.session.destroy();
    return { msg: 'Session has been destroyed!' };
  }
}
