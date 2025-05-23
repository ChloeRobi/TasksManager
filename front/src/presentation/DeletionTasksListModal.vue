<template>
    <v-dialog v-model="display" width="400">
        <v-card>
            <v-card-title class="text-h6">Validation</v-card-title>

            <v-card-text>
                Are you sure you want to delete this list? Its associated tasks will be deleted.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="deleteTasksList()">Delete</v-btn>
                <v-btn color="grey" text @click="emit('cancel')">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import type { ErrorMessage } from '@/domain/model/errorMessage';
import type TasksListService from '@/domain/service/tasksListService';
import { inject, ref, type Ref } from 'vue';

const emit = defineEmits<{
  (event: 'confirm'): void,
  (event: 'cancel'): void
  (event: 'error', messageError: string): void
}>();

const props = defineProps<{
  tasksListIdToDelete: number;
}>();

const display: Ref<boolean> = ref(true);

const tasksListService: TasksListService = inject(
  'tasks-list-service',
  {} as TasksListService
);

function deleteTasksList() {
  tasksListService.deleteTasksList(props.tasksListIdToDelete).then(() => {
    emit('confirm');
  }).catch((error: ErrorMessage) => {
    emit('error', error);
  })
}

</script>