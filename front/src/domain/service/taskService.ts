import type Task from "../model/task";
import type TaskToSave from "../model/taskToSave";
import type TaskPort from "../port/taskPort";

export default class TaskService {
    constructor(private taskPort: TaskPort) {}

    getTasks(): Promise<Task[]> {
        return this.taskPort.getTasks();
    }

    saveTaskLists(task: TaskToSave): Promise<Task> {
        return this.taskPort.save(task);
    }

}