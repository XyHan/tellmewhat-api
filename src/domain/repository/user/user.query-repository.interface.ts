import { UserInterface } from '../../model/user/user.model';

export interface UserQueryRepositoryInterface {
  findOneByUuid(uuid: string): Promise<UserInterface | null>;
  findOneByEmail(email: string): Promise<UserInterface | null>;
}
