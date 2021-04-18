import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateATicketDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  subject: string;
}
