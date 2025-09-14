import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import AllPostsView from '../views/AllPostsView.vue';
import UserPostsView from '../views/UserPostsView.vue';
import PostDetailView from '../views/PostDetailView.vue';
import CreatePostView from '../views/CreatePostView.vue';

const routes: RouteRecordRaw[] = [
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/', component: AllPostsView, meta: { requiresAuth: true } },
  { path: '/my-posts', component: UserPostsView, meta: { requiresAuth: true } },
  { path: '/posts/:id', component: PostDetailView, meta: { requiresAuth: true } },
  { path: '/create', component: CreatePostView, meta: { requiresAuth: true } },
  {
  path: '/:pathMatch(.*)*',
  redirect: (to) => {
    const isLoggedIn = !!localStorage.getItem('jwt_token'); // Check if user is already logged in
    return isLoggedIn ? '/' : '/login';
  }
}
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt_token');

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/');
  } else {
    next();
  }
});