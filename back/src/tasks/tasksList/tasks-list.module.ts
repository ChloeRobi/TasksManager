import { Module } from '@nestjs/common';
import { TasksListController } from './tasks-list.controller';
import { TasksListService } from './tasks-list.service';
import { TasksList } from './entities/tasks-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([TasksList])],
  controllers: [TasksListController],
  providers: [TasksListService],
  exports: [TasksListService]
})
export class TasksListModule {}