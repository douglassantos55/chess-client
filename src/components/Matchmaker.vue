<script setup lang="ts">
import { ref } from "vue";
import { Server } from "./server";
import Button from "./Button.vue";

const visible = ref(true);
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

props.server.on("start_game", () => {
  visible.value = false;
  waiting.value = false;
});

props.server.on("game_over", () => {
  visible.value = true;
  waiting.value = false;
});

function queueUp() {
  props.server.send("queue_up", {
    duration: selectedTime.value.duration,
    increment: selectedTime.value.increment,
  });
}
function cancel() {
  waiting.value = false;
  props.server.send("dequeue");
}
</script>

<template>
  <aside v-if="visible">
    <h3>Select the game mode</h3>

    <Button
      v-for="cur in times"
      :key="cur.duration"
      :data-test="cur.duration"
      :class="{
        selected: selectedTime && cur.duration == selectedTime.duration,
      }"
      :disabled="waiting"
      @click="selectedTime = cur"
    >
      {{ cur.label }}
    </Button>

    <Button
      large
      success
      data-test="play"
      @click="queueUp"
      v-if="!waiting"
      :disabled="!selectedTime"
    >
      Play
    </Button>

    <Button large v-if="waiting" data-test="cancel" @click="cancel">
      Cancel
    </Button>
  </aside>
</template>

<style scoped>
h3 {
  margin-top: 0;
  color: #f2f2f2;
  text-align: center;
  margin-bottom: 30px;
}
aside {
  flex-shrink: 0;
  min-height: 100vh;
  background: #2e2e2e;
  padding: 20px 40px 0;
  box-sizing: border-box;
  border-left: 2px solid #3c3c3c;
}
</style>
