<template>
  <v-navigation-drawer v-model="display" location="right" temporary width="400">
    <v-toolbar flat>
      <v-toolbar-title>Details</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-close" variant="text" @click="emit('closeDetails')"></v-btn>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card flat class="pa-4">
      <p>Short description : {{ shortDescription }}</p>
      <p>Description : {{ description }}</p>
      <p>End date : {{ endDate }}</p>
      <p>Creation date : {{ creationDate }}</p>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import type Task from '@/domain/model/task';
import { store } from '@/infrastructure/store';
import moment from 'moment';
import { onBeforeMount, ref, type Ref } from 'vue';

const emit = defineEmits<{
  (event: 'closeDetails'): void
}>();

const props = defineProps<{
  taskId: number;
}>();

onBeforeMount(() => {
  const taskToDisplay: Task | undefined = store.findTask(props.taskId);
  if (taskToDisplay !== undefined) {
    shortDescription.value = taskToDisplay.shortDescription;
    description.value = taskToDisplay.description;
    endDate.value = moment(taskToDisplay.endDate).format('DD/MM/YYYY');
    creationDate.value = moment(taskToDisplay.creationDate).format('DD/MM/YYYY');
  }
})

const display: Ref<boolean> = ref(true);
const shortDescription: Ref<string> = ref("");
const description: Ref<string> = ref("");
const endDate: Ref<string> = ref("");
const creationDate: Ref<string> = ref("");


</script>