<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" sm="6">
                <v-text-field v-model="shortDescription" :rules="shortDescriptionRules" label="Short description" outlined dense />
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field v-model="description" label="Description" outlined dense />
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field v-model="endDate" :rules="endDateRules" label="End date" type="date" outlined dense />
            </v-col>
        </v-row>

        <v-row justify="end">
            <v-col cols="auto">
                <v-btn color="grey" class="me-2" @click="emit('cancel')">
                    Cancel
                </v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn color="primary" prepend-icon="mdi-plus" @click="addTask()">
                    Add
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import type Task from '@/domain/model/task';
import type TaskToSave from '@/domain/model/taskToSave';
import type TaskService from '@/domain/service/taskService';
import { store } from '@/infrastructure/store';
import { inject, ref, type Ref } from 'vue';


const taskService: TaskService = inject(
    'task-service',
    {} as TaskService
);

const emit = defineEmits<{
  (event: 'confirm'): void,
  (event: 'cancel'): void
  (event: 'error', messageError: string): void
}>();

let tasksListId: number = store.getTasksId();

const shortDescription: Ref<string> = ref("");
const description: Ref<string> = ref("");
const endDate: Ref<Date> = ref(new Date());

const shortDescriptionRules = [
  (v: string) => !!v || 'Short description is required'
]

const endDateRules = [
  (v: string) => !!v || 'Date is required',
  (v: string) => {
    const selectedDate = new Date(v);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today || 'Date must be today or later';
  }
];

function addTask() {
    const task: TaskToSave = {
        short_description: shortDescription.value,
        description: description.value,
        end_date: endDate.value
    }
    taskService.saveTask(tasksListId, task)
    .then((savedTask: Task) => {
        store.addTask(savedTask);
        emit('confirm');
    }).catch((error) => {
        emit('error', error);
    })
}
</script>