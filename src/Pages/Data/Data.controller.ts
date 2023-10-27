import { Controller, Get, Query } from '@nestjs/common';
import { GradeModel } from '../../Modules/Database/models/Grade.model';
import { StudentModel } from '../../Modules/Database/models/Student.model';
import { LogInput } from './Data.input';
import { InjectModel } from '@nestjs/sequelize';
@Controller()
export class DataController {
  constructor(
    @InjectModel(GradeModel) private readonly grade: typeof GradeModel,
    @InjectModel(StudentModel) private readonly student: typeof StudentModel,
  ) {}
  @Get('log')
  async getLog(@Query() data: LogInput) {
    const result = await this.grade.findAll({
      attributes: ['grade', 'subject', ['createdAt', 'date']],
      order: ['createdAt'],
      include: [
        {
          model: this.student,
          attributes: ['personalCode', 'name', 'lastName'],
        },
      ],
      limit: data.page_size,
      offset: data.page - 1 * data.page_size,
    });
    return result;
  }
}
