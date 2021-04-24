import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateATicketDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  subject: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  type: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  project: string;
}
