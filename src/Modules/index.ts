import { Module } from '@nestjs/common';
import { NatsModule } from './Nats/Nats.module';

@Module({ imports: [NatsModule] })
export class Modules {}
