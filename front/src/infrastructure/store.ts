import type Task from '@/domain/model/task';
import type TaskService from '@/domain/service/taskService';
import { reactive } from 'vue';

export interface StoreState {
	tasksId: number;
    tasks: Task[];
	getTasksId(): number;
    setTasksId(id: number): void;
    getTasks(): Task[];
    setTasks(tasksToAdd: Task[]): void;
    addTask(tasksToAdd: Task): void;
    deleteTask(taskIdToDelete: number): void;
    findTask(taskId: number): Task | undefined;
    deleteTaskList(id: number): void;
}

export const store: StoreState = reactive({
	tasksId: -1 as number,
    tasks: [] as Task[],
    getTasksId(): number {
        return this.tasksId;
    },
    setTasksId(id: number): void {
        this.tasksId = id;
    },
    getTasks(): Task[] {
        return this.tasks;
    },
    setTasks(tasksToAdd: Task[]) {
        this.tasks.length = 0;
        this.tasks.push(...tasksToAdd);
    },
    addTask(taskToAdd: Task): void {
        this.tasks.push(taskToAdd);
    },
    deleteTask(taskIdToDelete: number): void {
        const foundedTask = this.tasks.findIndex((task) => task.id === taskIdToDelete);
        this.tasks.splice(foundedTask, 1);
    },
    findTask(taskId: number): Task | undefined {
        return this.tasks.find((task) => task.id === taskId);
    },
    deleteTaskList(id: number): void {
        if (this.tasksId === id) {
            this.tasks.length = 0;
            this.setTasksId(-1);
        }
    }
});