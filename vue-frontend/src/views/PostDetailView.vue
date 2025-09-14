<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import axios from '../axios';

const route = useRoute();
const post = ref<any>(null);

onMounted(async () => {
  const res = await axios.get(`/posts/${route.params.id}`);
  post.value = res.data;
});

const formatDate = (date: string) => new Date(date).toLocaleDateString();
</script>

<template>
  <Header />
  <div class="post-detail">
    <h2>{{ post?.title }}</h2>
    <p>{{ post?.content }}</p>
    <small>By {{ post?.author?.name }} on {{ formatDate(post?.created_at) }}</small>
  </div>
</template>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
</style>