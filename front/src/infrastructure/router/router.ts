import Login from '@/presentation/Login.vue';
import { createRouter, createWebHistory } from 'vue-router';

const UserRegistration = () => import('@/presentation/UserRegistration.vue');
const MainPage = () => import('@/presentation/MainPage.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/create-account',
      name: 'UserRegistration',
      component: UserRegistration,
    },
    {
      path: '/main-page/:userId/:userName/:email',
      name: 'MainPage',
      component: MainPage,
      props: true
    },
  ],
})

export default router