import { UserInterface } from '../../model/user/user.model';
import { TokenInterface } from '../../model/auth/token.model';

export interface AuthManagerInterface {
  currentUser: UserInterface | null;
  isValidPassword(passwordToCompare: string, passwordToCompareWith: string): Promise<boolean>;
  generateToken(user: UserInterface): TokenInterface;
  register(token: TokenInterface): Promise<boolean> ;
}
