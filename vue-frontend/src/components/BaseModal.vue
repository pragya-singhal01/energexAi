<script setup lang="ts">
defineProps({
  title: String,
  modelValue: Boolean
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const close = () => emit('update:modelValue', false);
</script>
<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-backdrop" @click.self="close">
      <div class="modal-content">
        <header class="modal-header">
          <h2>{{ title }}</h2>
          <button class="close-btn" @click="close">×</button>
        </header>

        <div class="modal-body">
          <slot />
        </div>

        <footer class="modal-footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>