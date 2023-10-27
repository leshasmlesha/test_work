import { Module } from '@nestjs/common';
import { Modules } from './Modules';
import { ConfigModule } from '@nestjs/config';
import configuration from './Config/configuration';
import { PagesModule } from './Pages/Pages.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    Modules,
    PagesModule,
  ],
})
export class AppModule {}
