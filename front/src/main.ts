import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import axios, { type AxiosInstance } from 'axios';
import UserService from './domain/service/userService';
import UserAdapter from './infrastructure/userAdapter';
import AuthenticationService from './domain/service/authenticationService';
import AuthenticationAdapter from './infrastructure/authenticationAdapter';
import router from './infrastructure/router/router';
import { store } from './infrastructure/store';

const axiosInstance: AxiosInstance = axios.create({
	baseURL: "http://localhost:3000/api",
	withCredentials: true,
	headers: { 'Content-Type': 'application/json' }
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
})

const app = createApp(App);

const authService = new AuthenticationService(new AuthenticationAdapter(axiosInstance));

app.use(vuetify)
    .provide('authentication-service', new AuthenticationService(new AuthenticationAdapter(axiosInstance)))
    .provide('user-service', new UserService(new UserAdapter(authService.getApi())))
    .provide('store', store)
    .use(router)
    .mount('#app');
