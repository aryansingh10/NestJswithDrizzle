import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/mysql2';
import { MySql2Database } from 'drizzle-orm/mysql2/driver';
import { createConnection } from 'mysql2/promise';
import * as schema from './schema';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'DRIZZLE_PROVIDER',
      useFactory: async (): Promise<MySql2Database<typeof schema>> => {
        const connection = await createConnection({
          host: 'localhost',
          user: 'aryansinghthakur',
          password: '1234',
          database: 'test',
        });
        return drizzle(connection, {
          schema,
          mode: 'default',
        });
      },
    },
  ],
  exports: ['DRIZZLE_PROVIDER'],
})
export class DatabaseModule {}
