<script setup lang="ts">
import { ref } from 'vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import BaseModal from './components/BaseModal.vue';
import PostForm from './components/PostForm.vue';

const showModal = ref(false);

const route = useRoute();
const shouldShowHeader = computed(() => {
  return route.meta.showHeader;
});

const submitForm = () => {
  // trigger form submission via ref or event
};

const handleSaved = () => {
  showModal.value = false;
};
</script>
<template>
  <Header v-if="shouldShowHeader" @openModal="showModal = true" />
  <BaseModal v-model="showModal" >
    <PostForm @cancel="showModal = false" @saved="handleSaved" />

    <template #footer>
      <button @click="showModal = false">Cancel</button>
      <button class="save-post" @click="submitForm">Save</button>
    </template>
  </BaseModal>
  <router-view />
</template>
