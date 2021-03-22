import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateAMediaDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  ticketUuid: string;
}
