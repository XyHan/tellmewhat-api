import { UserInterface } from '../../../domain/model/user/user.model';
import { UserFactory } from '../../../domain/factory/user.factory';
import { UserEntity } from '../entity/user.entity';
import {classToClass} from "class-transformer";

export const USER_COLLECTION: UserInterface[] = [
  new UserFactory(new UserEntity()).generate(
    '5e4e03a6-6e6f-4b39-a158-307d1e9082d8',
    1,
    'user1@test.com',
    'password1',
    '',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
  ),
  new UserFactory(new UserEntity()).generate(
    '0d66db91-4441-4563-967c-797d767c7288',
    1,
    'user2@test.com',
    'password2',
    '',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
  )
];

export class UserFixtures {
  private static readonly _userCollection: UserInterface[] = USER_COLLECTION;

  public static get userCollection(): UserInterface[] {
    return this._userCollection;
  }

  public static updateUser(userToUpdate: UserInterface): void {
    const userIndex: number = this._userCollection.findIndex((user: UserInterface) => user.uuid === userToUpdate.uuid);
    if (userIndex) {
      this._userCollection.splice(userIndex, 1);
      this._userCollection.push(
        new UserFactory(new UserEntity()).generate(
          userToUpdate.uuid,
          userToUpdate.status,
          userToUpdate.email,
          userToUpdate.password,
          userToUpdate.salt,
          userToUpdate.createdAt,
          userToUpdate.createdBy,
          userToUpdate.updatedAt,
          userToUpdate.updatedBy,
        )
      );
    }
  }

  public static addUser(user: UserInterface): void {
    this._userCollection.push(
      new UserFactory(new UserEntity()).generate(
        user.uuid,
        user.status,
        user.email,
        user.password,
        user.salt,
        user.createdAt,
        user.createdBy,
        user.updatedAt,
        user.updatedBy,
      )
    );
  }
}
