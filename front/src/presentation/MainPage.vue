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
          <Tasks @displayDetails="selectTask($event)"></Tasks>
        </div>
      </v-card-text>
    </v-main>

    <TaskDetails v-if="isTaskDetailsDisplayed" :taskId="selectedTaskId" @closeDetails="closeTaskDetails()"></TaskDetails>

  </v-layout>

  <v-snackbar v-model="showError" color="error" timeout="5000">
    {{ errorMessage }}
  </v-snackbar>
  <DeletionTasksListModal v-if="displayWarningMessage" :tasksListIdToDelete="tasksListIdToDelete"
    @confirm="confirmDeleteTasksList()" @cancel="displayWarningMessage = false" @error="setErrorOnListDeletion($event)">
  </DeletionTasksListModal>
</template>

<script setup lang="ts">
import type { ErrorMessage } from '@/domain/model/errorMessage';
import type TasksList from '@/domain/model/tasksList';
import type AuthenticationService from '@/domain/service/authenticationService';
import TasksListService from '@/domain/service/tasksListService';
import type { StoreState } from '@/infrastructure/store';
import TasksListAdapter from '@/infrastructure/tasksListAdapter';
import Tasks from './Tasks.vue';
import DeletionTasksListModal from './DeletionTasksListModal.vue';
import { computed, inject, onBeforeMount, provide, ref, type Ref } from 'vue';
import TaskService from '@/domain/service/taskService';
import TaskAdapter from '@/infrastructure/taskAdapter';
import type Task from '@/domain/model/task';
import TaskDetails from './TaskDetails.vue';

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
const taskService: TaskService = new TaskService(new TaskAdapter(authenticationService.getApi()));
provide("tasks-list-service", tasksListService);
provide("task-service", taskService);

const rail: Ref<boolean> = ref(true);
const tasksLists: Ref<TasksList[]> = ref([]);
const addTasksList: Ref<boolean> = ref(false);
const newListTasksTitle: Ref<string> = ref("");
const displayWarningMessage: Ref<boolean> = ref(false);
const tasksListIdToDelete: Ref<number> = ref(-1);
const errorMessage: Ref<string> = ref('')
const showError: Ref<boolean> = ref(false);
const isTaskDetailsDisplayed: Ref<boolean> = ref(false);
const selectedTaskId: Ref<number> = ref(-1);

onBeforeMount(() => {
  tasksListService.getTasksLists().then((lists: TasksList[]) => {
    tasksLists.value.push(...lists);
  }).catch((error: ErrorMessage) => {
    setError(error);
  })
})

const isAddingTasksList = computed(() => {
  return !rail.value && addTasksList.value;
})

const isTasksListSelected = computed(() => {
  return store.getTasksId() !== -1;
})

function saveNewTasksList() {
  tasksListService.saveTaskLists(newListTasksTitle.value).then((tasksList: TasksList) => {
    tasksLists.value.push(tasksList);
    newListTasksTitle.value = "";
  }).catch((error: ErrorMessage) => {
    setError(error);
  })
}

function deleteTasksList(id: number) {
  tasksListIdToDelete.value = id;
  displayWarningMessage.value = true;
}

function displayTasks(id: number) {
  store.setTasksId(id);
  taskService.getTasks(id).then((tasksToDisplay: Task[]) => {
    store.setTasks(tasksToDisplay);
  });
}

function confirmDeleteTasksList() {
  tasksLists.value = tasksLists.value.filter(task => task.id !== tasksListIdToDelete.value);
  store.deleteTaskList(tasksListIdToDelete.value);
  displayWarningMessage.value = false;
}

function setErrorOnListDeletion(message: string) {
  setError(message)
  displayWarningMessage.value = false;
}

function setError(message: string) {
  errorMessage.value = message;
  showError.value = true;
}

function selectTask(id: number) {
  selectedTaskId.value = id;
  isTaskDetailsDisplayed.value = true;
}

function closeTaskDetails() {
  selectedTaskId.value = -1;
  isTaskDetailsDisplayed.value = false;
}

</script>