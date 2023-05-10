import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ example: 'Billie' })
  username: string;

  @ApiProperty({ example: 'coh12345' })
  password: string;
}

export class LoginUserResponse {
  @ApiProperty({
    example: {
      user: {
        userId: 1,
        username: 'Billie',
        password: 'coh12345'
      }
    }
  })
  user: {
    userId: string;
    username: string;
    password: string;
  };

  @ApiProperty({ example: 'Logged In' })
  msg: string;
}

export class LogoutUserResponse {
  @ApiProperty({ example: 'Session has ended' })
  msg: string;
}

export class LoginCheckResponse {
  @ApiProperty({ example: 'Billie' })
  username: string;

  @ApiProperty({ example: 'coh12345' })
  password: string;

  @ApiProperty({ example: 'billie@gmail.com' })
  email: string;
}

export class SignupResponse {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'Billie' })
  username: string;

  @ApiProperty({ example: 'billie@gmail.com' })
  email: string;

  @ApiProperty({ example: '$2pfsZj.7uv' })
  password: string;

  @ApiProperty({ example: '2023-05-08T18:48:51.551Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-05-08T18:48:51.551Z' })
  createdAt: string;
}
