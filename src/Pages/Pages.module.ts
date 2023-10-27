import { Module } from '@nestjs/common';
import { DataModule } from './Data/Data.module';

@Module({ imports: [DataModule] })
export class PagesModule {}
