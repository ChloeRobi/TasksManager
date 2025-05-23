import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { ErrorMapper } from "./mapper/errorMapper";
import type TasksList from "@/domain/model/tasksList";
import type TasksListDto from "./dto/tasksListDto";
import type TasksListPort from "@/domain/port/tasksListPort";

export default class TasksListAdapter implements TasksListPort {

    private urlApi: string;

    constructor(private userId: number, private axiosInstance: AxiosInstance) {
        this.urlApi = `/users/${userId}/tasks-lists`;
    }

    getTasksLists(): Promise<TasksList[]> {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .get(this.urlApi)
                .then((response: AxiosResponse) => {
                    const tasksListsDto: TasksListDto[] = response.data;
                    const tasksLists: TasksList[] = tasksListsDto.map((tasksListDto: TasksListDto) => ({
                        id: tasksListDto.id,
                        title: tasksListDto.title
                    }));
                    resolve(tasksLists);
                }).catch((error: AxiosError) => {
                    reject(ErrorMapper.apply(error));
                });
        });
    }

    save(tasksListTitle: string): Promise<TasksList> {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .post(this.urlApi, { title: tasksListTitle })
                .then((response: AxiosResponse) => {
                    const tasksListDto: TasksListDto = response.data;
                    const tasksList: TasksList = {
                        id: tasksListDto.id,
                        title: tasksListDto.title
                    }
                    resolve(tasksList);
                }).catch((error: AxiosError) => {
                    reject(ErrorMapper.apply(error));
                });
        });
    }

    delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .delete(this.urlApi + `/${id}`)
                .then(() => {
                    resolve();
                }).catch((error: AxiosError) => {
                    reject(ErrorMapper.apply(error));
                });
        });
    }

}