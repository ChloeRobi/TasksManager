import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorMessage } from '../model/error-message';
import { TasksList } from '../tasksList/entities/tasks-list.entity';
import { TasksListService } from '../tasksList/tasks-list.service';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private tasksListService: TasksListService
  ) { }

  async save(listId: number, taskDto: TaskDto): Promise<Task> {
    const tasksList: TasksList = await this.tasksListService.findOne(listId);
    const task: Task = this.taskRepository.create({
      ...taskDto,
      creation_date: new Date(),
      tasks_list: tasksList
    });
    try {
      return await this.taskRepository.save(task);
    } catch (e) {
      console.error('Erreur lors de la sauvegarde de la tâche :', e);
      throw new BadRequestException(ErrorMessage.TASK_CREATION_FAILURE);
    }
  }

  async findAll(listId: number) {
    try {
      return await this.taskRepository.find({ where: { tasks_list: { id: listId } } });
    } catch (e) {
      console.error('Erreur lors de la recherche des tâches :', e);
      throw new BadRequestException(ErrorMessage.TASKS_SEARCH_FAILURE);
    }
  }

  async findOne(id: number): Promise<Task> {
    try {
      const task: Task | null = await this.taskRepository.findOne({ where: { id: id } });
      if (!task) {
        throw new NotFoundException(ErrorMessage.TASK_SEARCH_FAILURE);
      }
      return task;
    } catch (e) {
      console.error('Erreur lors de la recherche de la tâche :', e);
      throw new BadRequestException(ErrorMessage.TASK_SEARCH_FAILURE);
    }
  }

  async remove(listId: number, id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['tasks_list'],
    });
    if (!task) {
      console.error(`Task with ID ${id} not found`);
      throw new NotFoundException(ErrorMessage.TASK_SEARCH_FAILURE);
    }
    if (task.tasks_list.id !== listId) {
      throw new ForbiddenException(ErrorMessage.TASK_DELETION_FORBIDDEN);
    }
    try {
      await this.taskRepository.delete(id);
    } catch (e) {
      console.error('Erreur lors de la suppression de la liste de tâche :', e);
      throw new BadRequestException(ErrorMessage.TASK_DELETION_FAILURE);
    }
  }
}
