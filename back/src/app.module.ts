import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "taskManagerUser",
    password: "12345",
    database: "tasksmanager",
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true
  }), UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
