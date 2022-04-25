<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  duration: string;
  increment: string;
}>();

let interval;
const timeout = ref(parseDuration(props.duration));

const output = computed(() => {
  const date = new Date(timeout.value);
  return `${date.getMinutes()}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
});

function parseDuration(duration: string): number {
  const multiplier = {
    ms: 1,
    s: 1000,
    m: 1000 * 60,
  };
  const [_, digit, time] = duration.match(/([\d]+)([^\d]+)/);
  return parseInt(digit) * multiplier[time];
}

function update() {
  timeout.value -= 1000;
}

function start() {
  interval = setInterval(update, 1000);
}

function sync(ms: number) {
  timeout.value = ms;
}

function pause() {
  clearInterval(interval);
  timeout.value += parseDuration(props.increment);
}

defineExpose({ start, pause, sync });
</script>

<template>
  <span>{{ output }}</span>
</template>

<style scoped>
span {
  color: #f2f2f2;
  font-size: 32px;
}
</style>
