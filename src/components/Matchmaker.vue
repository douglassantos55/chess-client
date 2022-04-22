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
  <h3>Select the game mode</h3>

  <button
    v-for="cur in times"
    :key="cur.duration"
    :data-test="cur.duration"
    :class="[
      'time',
      { selected: selectedTime && cur.duration == selectedTime.duration },
    ]"
    :disabled="waiting"
    @click="selectedTime = cur"
  >
    {{ cur.label }}
  </button>

  <button
    class="play"
    data-test="play"
    @click="queueUp"
    :disabled="!selectedTime || waiting"
  >
    Play
  </button>
</template>

<style scoped>
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
h3 {
  margin-top: 0;
  color: #f2f2f2;
  text-align: center;
  margin-bottom: 30px;
}
.time {
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
.time:hover,
.time:focus,
.time.selected {
  color: #fff;
  background: #42a8bb;
}
.time:active {
  color: #fff;
  background: #237c8d;
}
.play {
  border: 0;
  width: 100%;
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
  display: block;
  cursor: pointer;
  color: #f2f2f2;
  background: #2ab757;
  border-radius: 50px;
  padding: 12px 15px;
}
.play:hover,
.play:focus {
  background: #0f8334;
}
.play:active {
  background: #076a27;
}
</style>
