import { VError } from '@netflix/nerror';
import { LoggerInterface } from '../../domain/utils/logger.interface';

export interface LoggerVErrorInterface extends LoggerInterface {
  verror(error: VError): void;
}
