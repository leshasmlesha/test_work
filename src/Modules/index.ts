import { Module } from '@nestjs/common';
import { NatsModule } from './Nats/Nats.module';
import { DatabaseModule } from './Database/Database.module';

@Module({ imports: [DatabaseModule, NatsModule] })
export class Modules {}
