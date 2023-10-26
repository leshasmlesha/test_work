import { Module } from '@nestjs/common';
import { Modules } from './Modules';

@Module({ imports: [Modules] })
export class AppModule {}
