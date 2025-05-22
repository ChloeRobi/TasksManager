import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';
import { TaskModule } from './tasks/task/task.module';
import { TasksListModule } from './tasks/tasksList/tasks-list.module';

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
  }), UserModule, AuthModule, TaskModule, TasksListModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
