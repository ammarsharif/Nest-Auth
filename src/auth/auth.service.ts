import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user/user.service';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase_config';

@Injectable()
export class AuthService {
  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
  ) {}

  async verifyToken(idToken: string) {
    try {
      const decodedToken = await this.firebaseService
        .getAuth()
        .verifyIdToken(idToken);
      let user = await this.userService.findByUid(decodedToken.uid as string);

      if (!user) {
        user = await this.userService.createUser({
          _id: decodedToken._id as string,
          email: decodedToken.email,
          displayName: (decodedToken.name as string) || '',
          photoURL: decodedToken.picture || '',
        });
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid or expired Firebase token',
        error,
      );
    }
  }

  async register(email: string, password: string, displayName: string) {
    try {
      const userRecord = await this.firebaseService.getAuth().createUser({
        email,
        password,
        displayName,
      });

      const user = await this.userService.createUser({
        _id: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL || '',
      });

      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async login(email: string, password: string) {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const { user } = response;
    // const { claims } = await user.getIdTokenResult(true);
    return user;
  }
}
