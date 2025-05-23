import { reactive } from 'vue';

export interface StoreState {
	tasksId: number | null;
	getTasksId(): number | null;
    setTasksId(id: number | null): void;
}

export const store: StoreState = reactive({
	tasksId: null as number | null,
    getTasksId(): number | null {
        return this.tasksId;
    },
    setTasksId(id: number | null): void {
        this.tasksId = id;
    }
});