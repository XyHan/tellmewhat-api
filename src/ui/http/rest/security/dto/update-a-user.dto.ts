import { IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAUserDto {
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  status: number;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email: string;
}
