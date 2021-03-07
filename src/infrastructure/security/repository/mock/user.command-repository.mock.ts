import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { UserRepositoryException } from '../user.repository.exception';
import { UserEntity } from '../../entity/user.entity';
import { UserFixtures } from '../../fixtures/user.fixtures';

export class UserCommandRepositoryMock implements UserCommandRepositoryInterface {
  public async create(user: UserInterface): Promise<UserInterface> {
    try {
      UserFixtures.addUser(user);
      return user;
    } catch (e) {
      const message: string = `UserCommandRepository - Error on create user '${user.uuid}'`;
      throw new UserRepositoryException(message);
    }
  }

  public async delete(user: UserEntity): Promise<UserInterface> {
    try {
      return user;
    } catch (e) {
      const message: string = `UserCommandRepository - Error on delete user '${user.uuid}'`;
      throw new UserRepositoryException(message);
    }
  }

  public async update(user: UserInterface): Promise<UserInterface> {
    try {
      UserFixtures.updateUser(user);
      return user;
    } catch (e) {
      const message: string = `UserCommandRepository - Error on update user '${user.uuid}'`;
      throw new UserRepositoryException(message);
    }
  }
}
