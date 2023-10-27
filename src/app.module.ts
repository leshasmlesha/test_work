import { Module } from '@nestjs/common';
import { Modules } from './Modules';
import { ConfigModule } from '@nestjs/config';
import configuration from './Config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    Modules,
  ],
})
export class AppModule {}
