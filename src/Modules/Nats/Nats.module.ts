import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import configuration from '../../Config/configuration';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'NATS_SERVICE',
          useFactory: (config: ConfigType<typeof configuration>) => ({
            transport: Transport.NATS,
            options: { servers: [`nats://${config.server}`] },
          }),
          inject: [configuration.KEY],
        },
      ],
    }),
  ],
})
export class NatsModule {}
