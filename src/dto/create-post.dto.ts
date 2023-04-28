import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  Name: string;

  @IsNotEmpty()
  @IsString()
  Blog: string;
}
