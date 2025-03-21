import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: { user: { _id: string } }) {
    console.log(req.user);
    return this.userService.findByUid(req.user._id);
  }

  @UseGuards(FirebaseAuthGuard)
  @Put('profile')
  async updateProfile(
    @Request() req: { user: { _id: string } },
    @Body() updateData: Partial<{ displayName: string; photoURL: string }>,
  ) {
    return this.userService.updateUser(req.user._id, updateData);
  }
}
