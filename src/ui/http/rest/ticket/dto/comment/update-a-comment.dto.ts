import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateACommentDto {
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  status: number;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  content: string;
}
