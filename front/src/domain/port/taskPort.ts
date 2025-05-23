import type Task from "../model/task";
import type TaskToSave from "../model/taskToSave";

export default interface TaskPort {
    getTasks(): Promise<Task[]>;
    save(task: TaskToSave): Promise<Task>;
}