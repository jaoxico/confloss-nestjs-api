import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class CreatePalestranteDto {
  @IsString()
  @IsDefined({ message: 'O nome é obrigatório!' })
  @Length(5, 100, {
    message:
      'O nome do palestrante deve ter no mínimo 5 e no máximo 100 caracteres!',
  })
  @ApiProperty({ name: 'nome', type: String })
  nome: string;

  @IsEmail(undefined, { message: 'E-mail inválido!' })
  @IsDefined({ message: 'O e-mail é obrigatório!' })
  @ApiProperty({ name: 'email', type: String })
  email: string;
}
