import { Test, TestingModule } from '@nestjs/testing';
import { PalestranteController } from './palestrante.controller';
import { PalestranteService } from './palestrante.service';

describe('PalestranteController', () => {
  let controller: PalestranteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PalestranteController],
      providers: [PalestranteService],
    }).compile();

    controller = module.get<PalestranteController>(PalestranteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
