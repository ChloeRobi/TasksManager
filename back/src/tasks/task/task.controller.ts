import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt.guard';

@Controller('tasks-lists/:listId/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Param('listId', ParseIntPipe) listId: number, @Body() taskDto: TaskDto) {
    return this.taskService.save(listId, taskDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Param('listId', ParseIntPipe) listId: number) {
    return this.taskService.findAll(listId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('listId', ParseIntPipe) listId: number, @Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(listId, id);
  }
}
