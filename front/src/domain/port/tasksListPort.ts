import type TasksList from "../model/tasksList";

export default interface TasksListPort {
    getTasksLists(): Promise<TasksList[]>;
    save(tasksListTitle: string): Promise<TasksList>;
    delete(id: number): Promise<void>;
}