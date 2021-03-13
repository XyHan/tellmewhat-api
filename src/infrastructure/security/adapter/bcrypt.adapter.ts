import { Injectable } from '@nestjs/common';
import { EncrypterInterface } from '../../../domain/utils/encrypter/encrypter.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptAdapter implements EncrypterInterface {
  public async compare(plainPassword: string, hashedPassword: string): Promise<boolean>  {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  public async hash(plainPassword: string, salt: string): Promise<string>  {
    return await bcrypt.hash(plainPassword, salt);
  }

  public async salt(): Promise<string> {
    return await bcrypt.genSalt(10);
  }
}
