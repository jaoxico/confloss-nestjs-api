import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'palestrante' })
export class Palestrante {
  @PrimaryGeneratedColumn()
  public readonly id: number;
  @Column({ type: 'varchar', length: 100 })
  @IsString({ message: 'O nome deve ser uma string!' })
  @Length(5, 100, {
    message: 'O tamanho do nome deve ser de no mínimo 5 e no máximo 100!',
  })
  @ApiProperty({ name: 'nome', type: String })
  private nome: string;
  @Column({ type: 'varchar' })
  @IsEmail()
  @ApiProperty({ name: 'e-mail', type: String })
  @Index({ unique: true })
  private email: string;

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public setEmail(email: string): void {
    this.email = email;
  }
}
