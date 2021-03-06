import { LoggerInterface } from '../../domain/utils/logger.interface';
import { LoggerVErrorInterface } from './logger-v-error.interface';
import { LoggerAdapterService } from './logger-adapter.service';
import { VError } from '@netflix/nerror';

export class LoggerMock implements LoggerInterface, LoggerVErrorInterface {
  public errorContent: string[] = [];
  public logContent: string[] = [];

  public error(message: string, ...meta: any[]): void {
    this.errorContent.push(message);
  }

  public log(message: any, context?: string): void {
    this.logContent.push(message);
  }

  public reset(): void {
    this.errorContent = [];
    this.logContent = [];
  }

  public verror(error: VError): void {
    const errorTxt = LoggerAdapterService.formatFullStackErrorResolver(error);
    this.errorContent.push(errorTxt);
  }

  public verbose(message: any, context?: string): void {
    this.logContent.push(message);
  }

  debug(message: string): void {}
  info(message: string): void {}
  warn(message: string): void {}
}
