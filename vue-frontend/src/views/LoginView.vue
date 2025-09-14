<script setup lang="ts">
import { useRoute } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
const route = useRoute();
const registered = route.query.registered === 'true';
</script>

<template>
  <div class="auth-container">
    <h2>Login</h2>
    <p v-if="registered" class="success">Hey! You have registered successfully!! Please Login.</p>
    <LoginForm />
    <router-link to="/register" class="auth-link">Don't have an account? Register here.</router-link>
  </div>
</template>