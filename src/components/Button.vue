<script setup lang="ts">
defineProps<{
  large?: boolean;
  success?: boolean;
  danger?: boolean;
}>();
</script>

<template>
  <button :class="['button', { large, danger, success }]">
    <slot />
  </button>
</template>

<style scoped>
.button {
  border: 0;
  width: 100%;
  display: block;
  cursor: pointer;
  font-size: 16px;
  background: #ddd;
  border-radius: 50px;
  margin-bottom: 10px;
  padding: 12px 15px;
  transition: all 0.1s ease-out;
}
.button:hover,
.button:focus,
.button.selected {
  color: #fff;
  background: #42a8bb;
}
.button:active {
  color: #fff;
  background: #237c8d;
}
.button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.large {
  font-size: 18px;
  font-weight: bold;
}

.success {
  color: #f2f2f2;
  background: #2ab757;
}
.success:hover,
.success:focus {
  background: #0f8334;
}
.success:active {
  background: #076a27;
}

.danger {
  color: #f2f2f2;
  background: #d74444;
}
.danger:hover,
.danger:focus {
  background: #b12a2a;
}
.danger:active {
  background: #911919;
}
</style>
