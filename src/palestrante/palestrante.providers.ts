import { Provider } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Palestrante } from './entities/palestrante.entity';

export const palestranteProviders: Array<Provider<Repository<Palestrante>>> = [
  {
    provide: 'PALESTRANTE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Palestrante),
    inject: ['DATA_SOURCE'],
  },
];
