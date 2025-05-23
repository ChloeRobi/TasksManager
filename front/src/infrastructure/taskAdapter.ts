import type Task from "@/domain/model/task";
import type TaskToSave from "@/domain/model/taskToSave";
import type TaskPort from "@/domain/port/taskPort";
import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { ErrorMapper } from "./mapper/errorMapper";
import type TaskDto from "./dto/taskDto";

export default class TaskAdapter implements TaskPort {

    private urlApi: string;

    constructor(private axiosInstance: AxiosInstance) {
        this.urlApi = `/tasks-lists/`;
    }

    getTasks(tasksListId: number): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .get(this.urlApi + `${tasksListId}/tasks`)
                .then((response: AxiosResponse) => {
                    const tasksDto: TaskDto[] = response.data;
                    const tasks: Task[] = tasksDto.map((taskDto: TaskDto) => ({
                        id: taskDto.id,
                        shortDescription: taskDto.short_description,
                        description: taskDto.description,
                        endDate: taskDto.end_date,
                        creationDate: taskDto.creation_date
                    }));
                    resolve(tasks);
                }).catch((error: AxiosError) => {
                    reject(ErrorMapper.apply(error));
                });
        });
    }

    save(tasksListId: number, task: TaskToSave): Promise<Task> {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .post(this.urlApi + `${tasksListId}/tasks`, task)
                .then((response: AxiosResponse) => {
                    const taskDto: TaskDto = response.data;
                    const task: Task = {
                        id: taskDto.id,
                        shortDescription: taskDto.short_description,
                        description: taskDto.description,
                        endDate: taskDto.end_date,
                        creationDate: taskDto.creation_date
                    }
                    resolve(task);
                }).catch((error: AxiosError) => {
                    reject(ErrorMapper.apply(error));
                });
        });
    }

    delete(tasksListId: number, id: number): Promise<void> {
        console.log(this.urlApi + `/${id}`)
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .delete(this.urlApi + `${tasksListId}/tasks/${id}`)
                .then(() => {
                    resolve();
                }).catch((error: AxiosError) => {
                    reject(ErrorMapper.apply(error));
                });
        });
    }
}