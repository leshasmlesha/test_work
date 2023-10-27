import { Module } from '@nestjs/common';
import { NatsController } from './Nats.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GradeModel } from '../Database/models/Grade.model';
import { StudentModel } from '../Database/models/Student.model';

@Module({
  imports: [SequelizeModule.forFeature([GradeModel, StudentModel])],
  controllers: [NatsController],
})
export class NatsModule {}
