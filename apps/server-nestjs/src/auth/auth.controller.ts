import {
  Body,
  Controller,
  Get,
  Request,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { z } from 'zod';
import { ZodValidationPipe } from '../zod-validation/zod-validation.pipe';
import {
  RegisterDto,
  registerSchema,
  SignInDto,
  signInSchema,
} from './auth.controller.schemas';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(signInSchema))
  signIn(@Body() signInDto: SignInDto): Promise<{ access_token: string }> {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public() // for now
  @Post('register')
  @UsePipes(new ZodValidationPipe(registerSchema))
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
