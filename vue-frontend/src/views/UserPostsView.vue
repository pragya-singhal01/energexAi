<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from '../axios';
import PostCard from '../components/PostCard.vue';

const posts = ref([]);
onMounted(async () => {
  const res = await axios.get('/posts/my');
  posts.value = res.data;
});
</script>

<template>
  <div class="posts-container">
    <h2>My Posts</h2>
    <PostCard v-for="post in posts" :key="post['id']" :post="post" />
  </div>
</template>