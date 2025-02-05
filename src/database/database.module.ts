import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/mysql2';
import { MySql2Database } from 'drizzle-orm/mysql2/driver';
import { createConnection } from 'mysql2/promise';
import * as schema from './schema';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'DRIZZLE_PROVIDER', //Name of the provider this can use anywhere when needed
      useFactory: async (
        configService: ConfigService,
      ): Promise<MySql2Database<typeof schema>> => {
        const connection = await createConnection({
          host: configService.get<string>('DB_HOST'),
          user: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASS'),
          database: configService.get<string>('DB_NAME'),
        });
        return drizzle(connection, {
          schema,
          mode: 'default',
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DRIZZLE_PROVIDER'], //This is the exported term DRIZZLE_PROVIDER is used
})
export class DatabaseModule {}
