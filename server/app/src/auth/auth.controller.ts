import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Account } from './entities/account.entity';

type PasswordOmitAccount = Omit<Account, 'password'>;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: { account: PasswordOmitAccount }) {
    return this.authService.login(req.account);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getProfile(@Request() req: { account: PasswordOmitAccount }) {
    return req.account;
  }
}
