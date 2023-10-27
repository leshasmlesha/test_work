import {
  CreationOptional,
  NonAttribute,
  HasManyCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { GradeModel } from './Grade.model';

@Table({ tableName: 'students' })
export class StudentModel extends Model<
  InferAttributes<StudentModel>,
  InferCreationAttributes<StudentModel>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;
  @AllowNull(false)
  @Column(DataType.STRING)
  personalCode: string;
  @Column(DataType.STRING)
  name: string;
  @Column(DataType.STRING)
  lastName: string;
  @HasMany(() => GradeModel, {
    foreignKey: 'personalCode',
    sourceKey: 'personalCode',
  })
  Grades: NonAttribute<GradeModel[]>;
  createGrade: HasManyCreateAssociationMixin<GradeModel, 'personalCode'>;
}
