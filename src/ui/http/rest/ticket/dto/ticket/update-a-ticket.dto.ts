import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateATicketDto {
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  status: number;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  subject: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  description: string;
}
