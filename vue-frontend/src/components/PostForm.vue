<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const title = ref('');
const description = ref('');
const router = useRouter();
const emit = defineEmits(['cancel', 'saved']);


const handleSave = () => {
  // Save logic here (e.g., API call)
  emit('saved');
  router.push('/');
};
</script>

<template>
  <form @submit.prevent="handleSave" class="post-form">
    <div class="flex-container">
      <label>Title</label>
      <input v-model="title" type="text" required placeholder="Enter post title" />
    </div>
    <div class="flex-container">
      <label>Description</label>
      <textarea v-model="description" required placeholder="Enter post description" rows="4"></textarea>
    </div>
  </form>
</template>