<template>
    <v-card-text>
        <v-list>
            <v-list-item v-for="task in tasks" :key="task.id" @click="showDetails(task.id)">
                <v-list-item-title>
                    {{ task.shortDescription }}
                    <v-chip v-if="hasTaskEnded(task)" size="small" color="green"
                        class="ms-2" label>
                        Ended
                    </v-chip>
                </v-list-item-title>
                <template v-slot:append>
                    <v-btn color="black" icon="mdi-trash-can" variant="text" @click="deleteTask(task.id)"></v-btn>
                </template>
            </v-list-item>
        </v-list>
        <v-list-item>
            <v-spacer></v-spacer>
            <template v-slot:append>
                <v-btn v-if="!isAddingTask" color="primary" prepend-icon="mdi-plus" @click="addTask()">
                    Add
                </v-btn>
            </template>
        </v-list-item>
        <TaskRegistration v-if="isAddingTask" @confirm="isAddingTask = false" @error="setErrorOnTaskAdd($event)"
            @cancel="isAddingTask = false"></TaskRegistration>
    </v-card-text>

    <v-snackbar v-model="showError" color="error" timeout="5000">
        {{ errorMessage }}
    </v-snackbar>
</template>

<script setup lang="ts">
import type { ErrorMessage } from '@/domain/model/errorMessage';
import type Task from '@/domain/model/task';
import TaskService from '@/domain/service/taskService';
import { store } from '@/infrastructure/store';
import { inject, ref, type Ref } from 'vue';
import TaskRegistration from './TaskRegistration.vue';

const taskService: TaskService = inject(
    'task-service',
    {} as TaskService
);

const emit = defineEmits<{
  (event: 'displayDetails', taskId: number): void
}>();

const tasks: Task[] = store.getTasks();
let errorMessage: Ref<string> = ref('');
let showError: Ref<boolean> = ref(false);
let isAddingTask: Ref<boolean> = ref(false);
let tasksListId: number = store.getTasksId();

function addTask() {
    isAddingTask.value = true;
}

function hasTaskEnded(task: Task) {
    return new Date(task.endDate) < new Date();
}

function showDetails(taskId: number) {
    console.log(taskId)
    emit('displayDetails', taskId);
}

function deleteTask(id: number) {
    taskService.delete(tasksListId, id).then(() => {
        store.deleteTask(id);
    }).catch((error: ErrorMessage) => {
        errorMessage.value = error;
        showError.value = true;
    })
}

function setErrorOnTaskAdd(message: string) {
    isAddingTask.value = false;
    setError(message);
}

function setError(message: string) {
    errorMessage.value = message;
    showError.value = true;
}

</script>