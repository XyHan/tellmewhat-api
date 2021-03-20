import { AuthManagerInterface } from './auth-manager.interface';
import { UserInterface } from '../../model/user/user.model';
import { TokenInterface, TokenModel } from '../../model/auth/token.model';

export class AuthManagerMock implements AuthManagerInterface {
  private readonly _refEmail: string;
  private readonly _refPassword: string;

  constructor(refEmail: string, refPassword) {
    this._refEmail = refEmail;
    this._refPassword = refPassword;
  }

  generateToken(user: UserInterface): TokenInterface {
    return new TokenModel('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Xy9cPRZXviW7okPF-_kn01rAWjzJ78klnf4kggDF5M4');
  }

  isValidPassword(passwordToCompare: string, passwordToCompareWith: string): Promise<boolean> {
    if (passwordToCompare === passwordToCompareWith) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}
