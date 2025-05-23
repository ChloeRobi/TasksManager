<template>
  <div class="login__container">
    <div class="login__form">
      <v-text-field class="login__text-field" v-model="emailToLogin" label="Login"></v-text-field>
      <v-text-field class="login__text-field" v-model="passwordToLogin" label="Password" type="password"></v-text-field>
      <v-btn @click="authentication()">
        Authenticate
      </v-btn>
      <v-btn @click="createAccount()">
        Create an account
      </v-btn>
    </div>
  </div>
  <v-snackbar v-model="showError" color="error" timeout="5000">
    {{ errorMessage }}
  </v-snackbar>
</template>

<style scoped>
.login__container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  min-width: 250px;
  gap: 16px;
}

.login__text-field {
  width: 100%;
}
</style>

<script setup lang="ts">
import type { ErrorMessage } from '@/domain/model/errorMessage';
import type UserLogin from '@/domain/model/userLogin';
import type AuthenticationService from '@/domain/service/authenticationService';
import type UserService from '@/domain/service/userService';
import { inject, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

let emailToLogin: Ref<string> = ref('');
let passwordToLogin: Ref<string> = ref('');
let errorMessage: Ref<string> = ref('')
let showError: Ref<boolean> = ref(false)

const authenticationService: AuthenticationService = inject(
  'authentication-service',
  {} as AuthenticationService
);

const userService: UserService = inject(
  'user-service',
  {} as UserService
);

async function authentication(): Promise<void> {
  const userLogin: UserLogin = {
    username: emailToLogin.value,
    password: passwordToLogin.value
  }
  await authenticationService.authenticateUser(userLogin)
    .catch((error: ErrorMessage) => {
      errorMessage.value = error;
      showError.value = true;
    });
  userService.getUserByEmail(userLogin.username).then((user) => {
    router.push({ name: 'MainPage', params: { userId: user.id, userName: user.firstname + " " + user.lastname, email: user.email } });
  })
}

function createAccount() {
  router.push({ name: 'UserRegistration' })
}

</script>
