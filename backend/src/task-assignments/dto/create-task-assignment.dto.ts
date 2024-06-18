import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateTaskAssignmentDto {
  @IsNumber({}, { message: 'El ID de la tarea debe ser un número.' })
  @IsNotEmpty({ message: 'El ID de la tarea no puede estar vacío.' })
  task_id: number;

  @IsNumber({}, { message: 'El ID del usuario debe ser un número.' })
  @IsNotEmpty({ message: 'El ID del usuario no puede estar vacío.' })
  user_id: number;

  @IsString()
  @Length(1, 50, { message: 'El estado debe tener entre 1 y 50 caracteres.' })
  status: string;
}
