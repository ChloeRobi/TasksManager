import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TasksListService } from './tasks-list.service';
import { TasksListDto } from './dto/tasks-list.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt.guard';
import { TasksList } from './entities/tasks-list.entity';

@Controller('users/:userId/tasks-lists')
export class TasksListController {
  constructor(private readonly tasksListService: TasksListService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Param('userId', ParseIntPipe) userId: number, @Body() tasksListDto: TasksListDto): Promise<TasksList> {
    return this.tasksListService.save(userId, tasksListDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Param('userId', ParseIntPipe) userId: number): Promise<TasksList[]> {
    return this.tasksListService.findAll(userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('userId', ParseIntPipe) userId: number, @Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksListService.remove(userId, id);
  }
}
