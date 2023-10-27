import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { StudentModel } from './Student.model';
@Table({ tableName: 'grades' })
export class GradeModel extends Model<
  InferAttributes<GradeModel>,
  InferCreationAttributes<GradeModel>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;
  @ForeignKey(() => StudentModel)
  @AllowNull(false)
  @Column(DataType.STRING)
  personalCode: string;
  @BelongsTo(() => StudentModel, {
    foreignKey: 'personalCode',
    targetKey: 'personalCode',
  })
  student: NonAttribute<StudentModel>;
  @AllowNull(false)
  @Column(DataType.INTEGER)
  grade: number;
  @AllowNull(false)
  @Column(DataType.STRING)
  subject: string;
}
