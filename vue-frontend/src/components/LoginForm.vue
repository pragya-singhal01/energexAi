<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import customAxios from '../axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref<string[] | string>([]);
const router = useRouter();

const handleLogin = async () => {
  try {
    const res = await customAxios.post('/login', { email: email.value, password: password.value });
    localStorage.setItem('jwt_token', res.data.token);
    router.push('/');
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      error.value = err.response.data.error;
      console.error('Server error:', err.response.data.error);
    } else {
      error.value = "Login Failed. Please try again later.";
      console.error('Unexpected error:', err)
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleLogin" class="auth-form">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <!-- Show errors cumulatively at one place -->
    <div v-if="typeof(error) == 'string'" class="error">{{ error }}</div>
    <div v-if="(typeof(error) != 'string') && error.length" class="error-box">
      <ul>
        <li v-for="(msg, index) in error" :key="index">{{ msg }}</li>
      </ul>
    </div>
    <button type="submit">Login</button>
  </form>
</template>