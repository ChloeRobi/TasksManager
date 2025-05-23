import type Task from "../model/task";
import type TaskToSave from "../model/taskToSave";
import type TaskPort from "../port/taskPort";

export default class TaskService {
    constructor(private taskPort: TaskPort) {}

    getTasks(tasksListId: number): Promise<Task[]> {
        return this.taskPort.getTasks(tasksListId);
    }

    saveTask(tasksListId: number, task: TaskToSave): Promise<Task> {
        return this.taskPort.save(tasksListId, task);
    }

    delete(tasksListId: number, id: number): Promise<void> {
        return this.taskPort.delete(tasksListId, id);
    }

}