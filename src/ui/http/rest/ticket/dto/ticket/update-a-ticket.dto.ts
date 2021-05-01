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
  @IsDefined()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  type: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  project: string;
}
