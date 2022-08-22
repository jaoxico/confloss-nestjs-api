import { Inject, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Palestrante } from './entities/palestrante.entity';
import { PalestranteService } from './palestrante.service';

describe('PalestranteService', () => {
  private logger: Logger = new Logger('palestranteService');

  constructor(
    @Inject('PALESTRANTE_REPOSITORY')
    public readonly palestranteRepository: Repository<Palestrante>,
  ) {}

  let service: PalestranteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PalestranteService],
    }).compile();

    service = module.get<PalestranteService>(PalestranteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
