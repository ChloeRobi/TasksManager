import type Task from "../model/task";
import type TaskToSave from "../model/taskToSave";

export default interface TaskPort {
    getTasks(tasksListId: number): Promise<Task[]>;
    save(tasksListId: number, task: TaskToSave): Promise<Task>;
    delete(tasksListId: number, id: number): Promise<void>;
}