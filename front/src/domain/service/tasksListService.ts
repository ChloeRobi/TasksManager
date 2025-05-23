import type TasksList from "../model/tasksList";
import type TasksListPort from "../port/tasksListPort";

export default class TasksListService {
    constructor(private tasksListPort: TasksListPort) {}

    getTasksLists(): Promise<TasksList[]> {
        return this.tasksListPort.getTasksLists();
    }

    saveTaskLists(tasksListTitle: string): Promise<TasksList> {
        return this.tasksListPort.save(tasksListTitle);
    }

    deleteTasksList(id: number): Promise<void> {
        return this.tasksListPort.delete(id);
    }

}