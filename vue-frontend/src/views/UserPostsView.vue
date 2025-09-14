<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from '../axios';
import Header from '../components/Header.vue';
import PostCard from '../components/PostCard.vue';

const posts = ref([]);
onMounted(async () => {
  const res = await axios.get('/posts/my');
  posts.value = res.data;
});
</script>

<template>
  <Header />
  <div class="posts-container">
    <h2>My Posts</h2>
    <PostCard v-for="post in posts" :key="post['id']" :post="post" />
  </div>
</template>

<style scoped>
.posts-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
</style>