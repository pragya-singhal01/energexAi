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
      <router-link to="/">All Posts</router-link>
      <router-link to="/my-posts">My Posts</router-link>
      <router-link to="/create">Create Post</router-link>
      <button @click="logout">Logout</button>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

nav {
  display: flex;
  gap: 15px;
  align-items: center;
}

router-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

button {
  margin-left: auto;
  background: none;
  border: none;
  color: #d00;
  cursor: pointer;
  font-weight: 500;
}
</style>