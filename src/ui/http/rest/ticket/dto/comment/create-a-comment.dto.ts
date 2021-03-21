import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateACommentDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  content: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  ticketUuid: string;
}
