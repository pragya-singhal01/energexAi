<script lang="ts" setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{ post: any }>();
const router = useRouter();

const goToDetail = () => {
  router.push(`/posts/${props.post.id}`);
};

const formatDate = (date: string) => new Date(date).toLocaleDateString();
</script>

<template>
  <div class="post-card" @click="goToDetail">
    <h3>{{ post.title }}</h3>
    <p class="multi-line-ellipsis">{{ post.content }}</p>
    <small>By {{ post?.author?.name??"" }} on {{ formatDate(post.created_at) }}</small> <!-- we don't have author.name yet, will modify after we have connected the APIs successfully-->
  </div>
</template>

<style scoped>
.post-card {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.multi-line-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>