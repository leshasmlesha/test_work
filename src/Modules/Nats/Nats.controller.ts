import {
  Controller,
  Inject,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { GradedEntity } from './entities/GradedEntity';
import { InjectModel } from '@nestjs/sequelize';
import { GradeModel } from '../Database/models/Grade.model';
import configuration from '../../Config/configuration';
import { ConfigType } from '@nestjs/config';
import { Observable, catchError, from, map, mergeMap, of } from 'rxjs';
import { StudentModel } from '../Database/models/Student.model';
import { NatsConnection, StringCodec } from 'nats';
import { StudentEntity } from './entities/StudentEntity';
export class NotFoundUser extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundUser.prototype);
  }
}
@Controller()
export class NatsController implements OnModuleInit, OnApplicationBootstrap {
  constructor(
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
    @InjectModel(GradeModel) private readonly grade: typeof GradeModel,
    @InjectModel(StudentModel) private readonly student: typeof StudentModel,
  ) {}
  private client: ClientProxy;
  private nc: NatsConnection;
  private codec = StringCodec();
  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: { servers: [this.config.server] },
    });
  }
  async onApplicationBootstrap() {
    this.nc = await this.client.connect();
  }

  @MessagePattern('students.v1.graded')
  async getGrades(@Payload() data: GradedEntity) {
    of(data)
      .pipe(
        mergeMap((data) =>
          from(
            this.student.findOne({
              where: { personalCode: data.personalCode },
              rejectOnEmpty: new NotFoundUser(),
            }),
          ).pipe(
            catchError((err: unknown) => {
              if (err instanceof NotFoundUser) {
                return this.getStudent(data.personalCode).pipe(
                  mergeMap((student) => this.student.create({ ...student })),
                );
              }
              throw err;
            }),
            mergeMap((student) => student.createGrade({ ...data })),
          ),
        ),
      )
      .subscribe();
  }
  getStudent(student: string): Observable<StudentEntity> {
    /**
     * используется клиент nats т.к client.send() возвращает ERR_VALIDATION_FAIL
     */
    return from(
      this.nc.request(
        'students.v1.get',
        JSON.stringify({ personalCode: student }),
      ),
    ).pipe(map((msg) => JSON.parse(this.codec.decode(msg.data)).data));
  }
}
