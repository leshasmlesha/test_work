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
@Controller()
export class NatsController implements OnModuleInit, OnApplicationBootstrap {
  constructor(
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
    @InjectModel(GradeModel) private readonly grade: typeof GradeModel,
  ) {}
  private client: ClientProxy;
  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: { servers: [this.config.server] },
    });
  }
  onApplicationBootstrap() {
    return this.client.connect();
  }

  @MessagePattern('students.v1.graded')
  async getGrades(@Payload() data: GradedEntity) {
    await this.grade.create({ ...data });
  }
}
