import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService, PasswordOmitAccount } from './auth.service';
import { AccountService } from './account.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

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

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createAccountDto: CreateAccountDto) {
    return await this.accountService.signup(createAccountDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/shops')
  async getShops() {
    return await this.accountService.getShops();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logistics')
  async getLogistics() {
    return await this.accountService.getLogistics();
  }
}
