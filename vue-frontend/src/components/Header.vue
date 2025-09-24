<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('jwt_token');
  router.push('/login');
};
</script>

<template>
  <header class="app-header">
    <nav>
      <ul class="nav-list">
        <li class="nav-items">
          <router-link class="nav-item" to="/">All Posts</router-link>
        </li>
        <li class="nav-items">
          <router-link class="nav-item" to="/my-posts">My Posts</router-link>
        </li>
        <li class="nav-items">
          <button class="nav-button" @click="$emit('openModal')">Create Post</button>
        </li>
      </ul>
      <button class="nav-logout" @click="logout">Logout</button>
    </nav>
  </header>
</template>