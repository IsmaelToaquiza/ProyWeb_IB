import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateTaskAssignmentDto {
  @IsString()
  @Length(1, 50, { message: 'El estado debe tener entre 1 y 50 caracteres.' })
  @IsOptional()
  status?: string;
}
