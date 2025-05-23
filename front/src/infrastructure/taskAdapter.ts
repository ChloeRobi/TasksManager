import type Task from "@/domain/model/task";
import type TaskToSave from "@/domain/model/taskToSave";
import type TaskPort from "@/domain/port/taskPort";
import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { ErrorMapper } from "./mapper/errorMapper";
import type TaskDto from "./dto/taskDto";

export default class TaskAdapter implements TaskPort {

    private urlApi: string;

    constructor(private tasksListId: number, private axiosInstance: AxiosInstance) {
        this.urlApi = `/tasks-lists/${tasksListId}/tasks`;
    }

    getTasks(): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .get(this.urlApi)
                .then((response: AxiosResponse) => {
                    const tasksDto: TaskDto[] = response.data;
                    const tasks: Task[] = tasksDto.map((taskDto: TaskDto) => ({
                        id: taskDto.id,
                        shortDescription: taskDto.shortDescription,
                        description: taskDto.description,
                        endDate: taskDto.endDate
                    }));
                    resolve(tasks);
                }).catch((error: AxiosError) => {
                    reject(ErrorMapper.apply(error));
                });
        });
    }

    save(task: TaskToSave): Promise<Task> {
        throw new Error("Method not implemented.");
    }
}