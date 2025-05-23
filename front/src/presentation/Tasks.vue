<template>
    <v-card-text>
        <div>
          <ul>
            <li v-for="task in tasks" :key="task.id">{{ task.shortDescription }}</li>
          </ul>
        </div>
      </v-card-text>
</template>

<script setup lang="ts">
import type Task from '@/domain/model/task';
import type AuthenticationService from '@/domain/service/authenticationService';
import TaskService from '@/domain/service/taskService';
import { store } from '@/infrastructure/store';
import TaskAdapter from '@/infrastructure/taskAdapter';
import { inject, onBeforeMount, ref, type Ref } from 'vue';

const authenticationService: AuthenticationService = inject(
  'authentication-service',
  {} as AuthenticationService
);

const taskService: TaskService = new TaskService(new TaskAdapter(Number(store.getTasksId()), authenticationService.getApi()))

const tasks: Ref<Task[]> = ref([]);

onBeforeMount(() => {
  taskService.getTasks().then((tasksToDisplay: Task[]) => {
    tasks.value.push(...tasksToDisplay);
  })
})

</script>