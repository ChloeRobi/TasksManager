<template>
  <v-layout>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon variant="text" @click.stop="rail = !rail"></v-app-bar-nav-icon>
      <v-toolbar-title>My tasks app</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer :width="500" :rail="rail" permanent @click="rail = false">
      <v-list>
        <v-list-item prepend-icon="mdi-account" :subtitle="email" :title="userName"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-checkbox-marked-circle-plus-outline" title="Add a tasks list"
          @click="addTasksList = true"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list v-if="!rail" density="compact" nav>
        <v-list-item v-for="tasksList in tasksLists" :key="tasksList.id" density="compact"
          @click="displayTasks(tasksList.id)">
          <v-list-item-title> {{ tasksList.title }}</v-list-item-title>
          <template v-slot:append>
            <v-btn color="black" icon="mdi-trash-can" variant="text" @click="deleteTasksList(tasksList.id)"></v-btn>
          </template>
        </v-list-item>
      </v-list>

      <div v-if="isAddingTasksList" class="pa-4 mt-auto">
        <v-text-field v-model="newListTasksTitle" label="New tasks list" density="compact" hide-details clearable />
        <div class="text-end mt-2">
          <v-btn variant="text" color="secondary" @click="addTasksList = false">Cancel</v-btn>
          <v-btn variant="text" color="primary" @click="saveNewTasksList()">Validate</v-btn>
        </div>
      </div>

    </v-navigation-drawer>

    <v-main style="height: 500px;">
      <v-card-text>
        <div v-if="!isTasksListSelected">
          <h3>Select a list to show tasks</h3>
        </div>
        <div v-else>
          <Tasks></Tasks>
        </div>
      </v-card-text>
    </v-main>
  </v-layout>

  <v-snackbar v-model="showError" color="error" timeout="5000">
    {{ errorMessage }}
  </v-snackbar>
</template>

<script setup lang="ts">
import type { ErrorMessage } from '@/domain/model/errorMessage';
import type TasksList from '@/domain/model/tasksList';
import type AuthenticationService from '@/domain/service/authenticationService';
import TasksListService from '@/domain/service/tasksListService';
import type { StoreState } from '@/infrastructure/store';
import TasksListAdapter from '@/infrastructure/tasksListAdapter';
import Tasks from './Tasks.vue';
import { computed, inject, onBeforeMount, ref, type Ref } from 'vue';

const props = defineProps<{
  userId: string;
  userName: string;
  email: string;
}>();

const authenticationService: AuthenticationService = inject(
  'authentication-service',
  {} as AuthenticationService
);

const store: StoreState = inject('store', {} as StoreState);

const tasksListService: TasksListService = new TasksListService(new TasksListAdapter(Number(props.userId), authenticationService.getApi()));

const rail: Ref<boolean> = ref(true);
const tasksLists: Ref<TasksList[]> = ref([]);
const addTasksList: Ref<boolean> = ref(false);
const newListTasksTitle: Ref<string> = ref("");
const isTasksListSelected: Ref<boolean> = ref(false);
let errorMessage: Ref<string> = ref('')
let showError: Ref<boolean> = ref(false)

onBeforeMount(() => {
  tasksListService.getTasksLists().then((lists: TasksList[]) => {
    tasksLists.value.push(...lists);
  }).catch((error: ErrorMessage) => {
    errorMessage.value = error;
    showError.value = true;
  })
})

const isAddingTasksList = computed(() => {
  return !rail.value && addTasksList.value;
})

function saveNewTasksList() {
  tasksListService.saveTaskLists(newListTasksTitle.value).then((tasksList: TasksList) => {
    tasksLists.value.push(tasksList);
    newListTasksTitle.value = "";
  }).catch((error: ErrorMessage) => {
    errorMessage.value = error;
    showError.value = true;
  })
}

function displayTasks(id: number) {
  store.setTasksId(id);
  isTasksListSelected.value = true;
}

function deleteTasksList(id: number) {
  tasksListService.deleteTasksList(id).then(() => {
    tasksLists.value = tasksLists.value.filter(task => task.id !== id);
  }).catch((error: ErrorMessage) => {
    errorMessage.value = error;
    showError.value = true;
  })
}

</script>