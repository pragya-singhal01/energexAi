<script setup lang="ts">
import { reactive, ref } from 'vue';
import axios from 'axios';
import customAxios from '../axios';
import { useRouter } from 'vue-router';

const form = reactive({name: '', email: '', password: '', confirm: ''});
const errorMessages = ref<string[] | string>([]);
const router = useRouter();

// Validate form fields
function validateForm () {
  const errors = [];

  if (!form.name.trim()) errors.push('Name is required');
  if (!form.email.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.push('Invalid email format');
  }

  if (!form.password.trim()) errors.push('Password is required');
  if (!form.confirm.trim()) {
    errors.push('Confirm password is required');
  } else if (form.confirm !== form.password) {
    errors.push('Passwords do not match');
  }

  return errors;
}

const handleRegister = async () => {
  errorMessages.value = validateForm(); // Validate form on submission

  // If errors return
  if (errorMessages.value.length > 0) {
    console.log('Form has errors:', (errorMessages));
    return;
  }

  // Call node backend register api
  try {
    await customAxios.post('/register', {
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.confirm
    });
    router.push({ path: '/login', query: { registered: 'true' } });
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      errorMessages.value = err.response.data.error;
      console.error('Server error:', errorMessages.value);
    } else {
      errorMessages.value = "Registeration Failed! Please try again later.";
      console.error('Unexpected error:', err)
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleRegister" class="auth-form">
    <input v-model="form.name" type="text" placeholder="Name" required />
    <input v-model="form.email" type="email" placeholder="Email" required />
    <input v-model="form.password" type="password" placeholder="Password" required />
    <input v-model="form.confirm" type="password" placeholder="Confirm Password" required />

    <!-- Show errors cumulatively at one place -->
    <div v-if="typeof(errorMessages) == 'string'" class="error">{{ errorMessages }}</div>
    <div v-if="(typeof(errorMessages) != 'string') && errorMessages.length" class="error-box">
      <ul>
        <li v-for="(msg, index) in errorMessages" :key="index">{{ msg }}</li>
      </ul>
    </div>

    <button type="submit">Register</button>
  </form>
</template>