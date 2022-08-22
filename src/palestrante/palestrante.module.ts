import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { PalestranteController } from './palestrante.controller';
import { palestranteProviders } from './palestrante.providers';
import { PalestranteService } from './palestrante.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PalestranteController],
  providers: [...palestranteProviders, PalestranteService],
})
export class PalestranteModule {}
