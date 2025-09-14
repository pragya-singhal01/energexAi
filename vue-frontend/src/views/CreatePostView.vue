<script lang="ts" setup>
import { ref } from 'vue';
import axios from '../axios';
import { useRouter } from 'vue-router';

const title = ref('');
const content = ref('');
const router = useRouter();

const handleCreate = async () => {
  await axios.post('/posts', { title: title.value, content: content.value });
  router.push('/');
};
</script>

<template>
  <div class="create-post">
    <h2>Create Post</h2>
    <form @submit.prevent="handleCreate" class="auth-form">
      <input v-model="title" placeholder="Title" required />
      <textarea v-model="content" placeholder="Content" required></textarea>
      <button type="submit">Save</button>
    </form>
  </div>
</template>