import { Module } from '@nestjs/common';
import { NatsController } from './Nats.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GradeModel } from '../Database/models/Grade.model';

@Module({
  imports: [SequelizeModule.forFeature([GradeModel])],
  controllers: [NatsController],
})
export class NatsModule {}
