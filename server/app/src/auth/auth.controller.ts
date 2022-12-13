import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService, PasswordOmitAccount } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: { user: PasswordOmitAccount }) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: { user: PasswordOmitAccount }) {
    return req.user;
  }
}
