import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PalestranteModule } from './palestrante/palestrante.module';

@Module({
  imports: [PalestranteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
