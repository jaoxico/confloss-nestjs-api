import { PartialType } from '@nestjs/swagger';
import { CreatePalestranteDto } from './create-palestrante.dto';

export class UpdatePalestranteDto extends PartialType(CreatePalestranteDto) {}
