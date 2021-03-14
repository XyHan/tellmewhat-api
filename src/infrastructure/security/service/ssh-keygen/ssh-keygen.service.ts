import { generateKeyPair } from 'crypto';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { SshKeygenServiceException } from './ssh-keygen.service.exception';

@Injectable()
export class SshKeygenService {
  public generateKeys(path: string): void {
    try {
      generateKeyPair(
        'rsa',
        {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
          },
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: ''
          }
        },
        (err: Error | null, publicKey: string, privateKey: string) => {
          this.writeKey(publicKey, path, 'public.pem');
          this.writeKey(privateKey, path, 'private.pem');
        }
      );
    } catch (e) {
      throw new SshKeygenServiceException(`SshKeygenService - generateKeys - ${e.message}`);
    }
  }

  public writeKey(key: string, path: string, filename: string): void {
    try {
      fs.mkdirSync(path, { recursive: true });
      fs.writeFileSync(`${path}/${filename}`, key);
    } catch (e) {
      throw new SshKeygenServiceException(`SshKeygenService - writeKey - ${e.message}`);
    }
  }
}
