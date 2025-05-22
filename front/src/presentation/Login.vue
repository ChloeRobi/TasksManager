<template>
  <div class="login__container">
    <div class="login__form">
      <v-text-field class="login__text-field" v-model="email" label="Login"></v-text-field>
      <v-text-field class="login__text-field" v-model="password" label="Password" type="password"></v-text-field>
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
  justify-content: center; /* centre horizontalement */
  align-items: center;     /* centre verticalement */
  height: 100vh;           /* pleine hauteur de la fenêtre */
}

.login__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;              /* 20% de la largeur de la page */
  min-width: 250px;        /* minimum pour les petits écrans */
  gap: 16px;               /* espace entre les éléments */
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

let email: Ref<string> = ref('');
let password: Ref<string> = ref('');
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
    username: email.value,
    password: password.value
  }
  await authenticationService.authenticateUser(userLogin)
    .catch((error: ErrorMessage) => {
      errorMessage.value = error;
      showError.value = true;
    });
  userService.getUser(userLogin.username).then((user) => {
    console.log(user)
    router.push({ name: 'MainPage' , params: { userId: user.id } });
  })
}

function createAccount() {
  router.push({ name: 'UserRegistration' })
}

</script>
