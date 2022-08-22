import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePalestranteDto } from './dto/create-palestrante.dto';
import { UpdatePalestranteDto } from './dto/update-palestrante.dto';
import { Palestrante } from './entities/palestrante.entity';

@Injectable()
export class PalestranteService {
  private logger: Logger = new Logger('palestranteService');

  constructor(
    @Inject('PALESTRANTE_REPOSITORY')
    public readonly palestranteRepository: Repository<Palestrante>,
  ) {}

  async create(
    createPalestranteDto: CreatePalestranteDto,
  ): Promise<Palestrante> {
    this.logger.debug('Cadastrando palestrante');
    try {
      const newPalestrante = this.palestranteRepository.create();
      newPalestrante.setNome(createPalestranteDto.nome);
      newPalestrante.setEmail(createPalestranteDto.email);
      const insertResult = await this.palestranteRepository.insert(
        newPalestrante,
      );
      const created = await this.palestranteRepository.findOneBy({
        id: insertResult.raw.insertId,
      });
      this.logger.debug(created);
      return created;
    } catch (e) {
      this.logger.debug(JSON.stringify(e, null, 4));
      throw new HttpException(
        `Falha no cadastramento do palestrante ${JSON.stringify(
          createPalestranteDto,
        )}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Array<Palestrante>> {
    this.logger.debug('Buscando a lista de palestrantes');
    try {
      return await this.palestranteRepository.find();
    } catch (e) {
      this.logger.debug(JSON.stringify(e, null, 4));
      throw new HttpException(
        `Falha na busca da lista de palestrantes cadastrados!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Palestrante> {
    this.logger.debug(`Buscando o palestrante com o id ${id}.`);
    try {
      const palestrante = await this.palestranteRepository.findOneBy({ id });
      if (palestrante) return palestrante;
    } catch (e) {
      this.logger.debug(JSON.stringify(e, null, 4));
      throw new HttpException(
        `Falha na busca do palestrante ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    this.logger.debug(`Palestrante ${id} não encontrado|`);
    throw new HttpException('Palestrante não encontrado', HttpStatus.NOT_FOUND);
  }

  async update(
    id: number,
    updatePalestranteDto: UpdatePalestranteDto,
  ): Promise<Palestrante> {
    this.logger.debug(`Alterando palestrante ${id}.`);
    try {
      const palestrante = await this.palestranteRepository.findOneBy({ id });
      if (palestrante) {
        if (updatePalestranteDto.nome)
          palestrante.setNome(updatePalestranteDto.nome);
        if (updatePalestranteDto.email)
          palestrante.setEmail(updatePalestranteDto.email);
        await this.palestranteRepository.save(palestrante);
        return palestrante;
      }
    } catch (e) {
      this.logger.debug(JSON.stringify(e, null, 4));
      throw new HttpException(
        `Falha na gravação da alteração ou na busca do palestrante ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    this.logger.debug(`Palestrante ${id} não encontrado|`);
    throw new HttpException('Palestrante não encontrado', HttpStatus.NOT_FOUND);
  }

  async remove(id: number): Promise<string> {
    this.logger.debug(`Excluindo palestrante ${id}.`);
    try {
      const palestrante = await this.palestranteRepository.findOneBy({ id });
      if (palestrante) {
        await this.palestranteRepository.remove(palestrante);
        return `Palestrante excluído com sucesso`;
      }
    } catch (e) {
      this.logger.debug(JSON.stringify(e, null, 4));
      throw new HttpException(
        `Falha na exclusão ou na busca do palestrante ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    this.logger.debug(`Palestrante ${id} não encontrado|`);
    throw new HttpException('Palestrante não encontrado', HttpStatus.NOT_FOUND);
  }
}
