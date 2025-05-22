import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorMessage } from '../model/error-message';
import { TasksList } from './entities/tasks-list.entity';
import { TasksListDto } from './dto/tasks-list.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TasksListService {

  constructor(
    @InjectRepository(TasksList)
    private tasksListRepository: Repository<TasksList>,
    private userService: UserService,
  ) { }

  async save(userId: number, tasksListDto: TasksListDto): Promise<TasksList> {
    const user: User = await this.userService.findOne(userId);
    const tasksList = this.tasksListRepository.create({
      ...tasksListDto,
      user
    });
    try {
      return await this.tasksListRepository.save(tasksList);
    } catch (e) {
      console.error('Erreur lors de la sauvegarde de la liste de tâches :', e);
      throw new BadRequestException(ErrorMessage.TASKS_LIST_CREATION_FAILURE);
    }
  }

  async findOne(listId: number): Promise<TasksList> {
    try {
      const tasksList: TasksList | null = await this.tasksListRepository.findOne({ where: { id: listId } });
      if (!tasksList) {
        throw new NotFoundException(ErrorMessage.TASKS_LIST_SEARCH_FAILURE);
      }
      return tasksList;
    } catch (e) {
      console.error('Erreur lors de la recherche de la liste de tâche :', e);
      throw new BadRequestException(ErrorMessage.TASKS_LISTS_SEARCH_FAILURE);
    }
  }

  async findAll(userId: number): Promise<TasksList[]> {
    try {
      return await this.tasksListRepository.find({ where: { user: { id: userId } } });
    } catch (e) {
      console.error('Erreur lors de la recherche de la liste de tâche :', e);
      throw new BadRequestException(ErrorMessage.TASKS_LISTS_SEARCH_FAILURE);
    }
  }

  async remove(userId: number, id: number): Promise<void> {
    const tasksList = await this.tasksListRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!tasksList) {
      console.error(`TasksList with ID ${id} not found`);
      throw new NotFoundException(ErrorMessage.TASKS_LIST_SEARCH_FAILURE);
    }
    if (tasksList.user.id !== userId) {
      throw new ForbiddenException(ErrorMessage.TASKS_LIST_DELETION_FORBIDDEN);
    }
    try {
      await this.tasksListRepository.delete(id);
    } catch (e) {
      console.error('Erreur lors de la suppression de la liste de tâche :', e);
      throw new BadRequestException(ErrorMessage.TASKS_LIST_DELETION_FAILURE);
    }
  }
}
