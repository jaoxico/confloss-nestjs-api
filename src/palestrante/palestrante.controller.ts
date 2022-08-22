import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { CreatePalestranteDto } from './dto/create-palestrante.dto';
import { UpdatePalestranteDto } from './dto/update-palestrante.dto';
import { Palestrante } from './entities/palestrante.entity';
import { PalestranteService } from './palestrante.service';

@Controller('palestrante')
export class PalestranteController {
  constructor(private readonly palestranteService: PalestranteService) {}

  @Post()
  @ApiTags('palestrante')
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Palestrante cadastrado com sucesso',
    type: Palestrante,
  })
  @ApiInternalServerErrorResponse({
    description: 'Falha interna. Tente novamente mais tarde.',
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiConsumes('application/json')
  async create(
    @Body() createPalestranteDto: CreatePalestranteDto,
  ): Promise<Palestrante> {
    return await this.palestranteService.create(createPalestranteDto);
  }

  @Get()
  @ApiTags('palestrante')
  @ApiOkResponse({
    type: [Palestrante],
    description: 'Palestrantes existentes.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Falha interna. Tente novamente mais tarde.',
  })
  async findAll(): Promise<Array<Palestrante>> {
    return await this.palestranteService.findAll();
  }

  @Get(':id')
  @ApiTags('palestrante')
  @ApiOkResponse({ type: Palestrante, description: 'Palestrante encontrado' })
  @ApiNotFoundResponse({ description: 'Palestrante não encontrado.' })
  @ApiInternalServerErrorResponse({
    description: 'Falha interna. Tente novamente mais tarde.',
  })
  async findOne(@Param('id') id: number): Promise<Palestrante> {
    return await this.palestranteService.findOne(id);
  }

  @Patch(':id')
  @ApiTags('palestrante')
  @ApiOkResponse({
    type: Palestrante,
    description: 'Palestrante atualizado com sucesso',
  })
  @ApiNotFoundResponse({ description: 'Palestrante não encontrado.' })
  @ApiInternalServerErrorResponse({
    description: 'Falha interna. Tente novamente mais tarde.',
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiConsumes('application/json')
  async update(
    @Param('id') id: number,
    @Body() updatePalestranteDto: UpdatePalestranteDto,
  ): Promise<Palestrante> {
    return await this.palestranteService.update(id, updatePalestranteDto);
  }

  @Delete(':id')
  @ApiTags('palestrante')
  @ApiOkResponse({ description: 'Palestrante excluído com sucesso' })
  @ApiNotFoundResponse({ description: 'Palestrante não encontrado' })
  @ApiInternalServerErrorResponse({
    description: 'Falha interna. Tente novamente mais tarde.',
  })
  async remove(@Param('id') id: number): Promise<string> {
    return await this.palestranteService.remove(id);
  }
}
