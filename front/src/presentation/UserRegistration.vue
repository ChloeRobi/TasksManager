<template>
  <div class="login__container">
    <v-btn icon class="back-button" @click="goToLogin()">
      <v-icon icon="mdi-arrow-left" />
    </v-btn>

    <div class="login__form">
      <v-form class="login__text-field" v-model="isFormValid" ref="formRef">
        <v-text-field
          v-model="firstName"
          :rules="nameRules"
          label="First name"
        />
        <v-text-field
          v-model="lastName"
          :rules="nameRules"
          label="Last name"
          required
        />
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        />
        <v-text-field
          v-model="emailVerification"
          :rules="emailVerificationRules"
          label="Verify e-mail"
          required
        />
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
          type="password"
        />
      </v-form>
      <v-btn @click="addUser()">
        Create
      </v-btn>
    </div>
  </div>
  <v-snackbar v-model="showError" color="error" timeout="5000">
    {{ errorMessage }}
  </v-snackbar>
  <v-snackbar v-model="showSuccess" color="success" timeout="5000">
    {{ successMessage }}
  </v-snackbar>
</template>

<style scoped>
.login__container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.back-button {
  position: absolute;
  top: 16px;
  left: 16px;
}

.login__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  min-width: 300px;
  gap: 16px;
}

.login__text-field {
  width: 100%;
}
</style>

<script setup lang="ts">
import type { ErrorMessage } from '@/domain/model/errorMessage';
import type UserToSave from '@/domain/model/userToSave';
import UserService from '@/domain/service/userService';
import { inject, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let isFormValid: Ref<boolean> = ref(false);
let firstName: Ref<string> = ref('');
let lastName: Ref<string> = ref('');
let email: Ref<string> = ref('');
let emailVerification: Ref<string> = ref('');
let password: Ref<string> = ref('');

const userService: UserService = inject(
	'user-service',
	{} as UserService
);

let errorMessage: Ref<string> = ref('');
let showError: Ref<boolean> = ref(false);
let successMessage: Ref<string> = ref('');
let showSuccess: Ref<boolean> = ref(false);
const formRef = ref();
  
const nameRules = [
  (v: string) => !!v || 'Name is required'
]

const emailRules = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
]

const emailVerificationRules = [
  (v: string) => !!v || 'E-mail verification is required',
  (v: string) => v === email.value || 'E-mail verification should be the same as below',
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 10 || 'Password must be at least 10 characters'
]

function goToLogin() {
  router.back();
}

function addUser(): void {
  const user: UserToSave = {
    firstname: firstName.value,
    lastname: lastName.value,
    email: email.value,
    password: password.value
  }
  userService.saveUser(user).then((savedUser) => {
    successMessage.value = `${ savedUser.firstname } user saved`;
    showSuccess.value = true;
    formRef.value?.reset();
  }).catch((error: ErrorMessage) => {
    errorMessage.value = error;
    showError.value = true;
  });
}

</script>
