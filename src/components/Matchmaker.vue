<script setup lang="ts">
import { ref } from "vue";
import { Server } from "./server";

const waiting = ref(false);
const selectedTime = ref(null);

type Time = {
  label: string;
  duration: "5m" | "10m";
  increment: "0s" | "1s" | "2s" | "5s";
};

const props = defineProps<{
  server: Server;
  times: Time[];
}>();

props.server.on("wait_for_match", () => {
  waiting.value = true;
});

props.server.on("match_canceled", () => {
  waiting.value = false;
});

function queueUp() {
  props.server.send("queue_up", {
    duration: selectedTime.value.duration,
    increment: selectedTime.value.increment,
  });
}
</script>

<template>
  <button
    v-for="cur in times"
    :key="cur.duration"
    :data-test="cur.duration"
    :class="{ selected: cur == selectedTime }"
    :disabled="waiting"
    @click="selectedTime = cur"
  >
    {{ cur.label }}
  </button>

  <button
    data-test="play"
    @click="queueUp"
    :disabled="!selectedTime || waiting"
  >
    Play
  </button>
</template>
