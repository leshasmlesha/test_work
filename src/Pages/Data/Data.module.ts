import { Module } from '@nestjs/common';
import { DataController } from './Data.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GradeModel } from '../../Modules/Database/models/Grade.model';
import { StudentModel } from '../../Modules/Database/models/Student.model';

@Module({
  imports: [SequelizeModule.forFeature([GradeModel, StudentModel])],
  controllers: [DataController],
})
export class DataModule {}
