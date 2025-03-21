import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestWithUser } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { email: string; password: string; displayName: string },
  ) {
    return this.authService.register(
      body.email,
      body.password,
      body.displayName,
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
