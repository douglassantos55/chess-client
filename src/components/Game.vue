<script setup lang="ts">
import { ref } from "vue";
import { Server } from "@/server";
import { Color } from "@/types";
import Timer from "./Timer.vue";
import Button from "./Button.vue";

const props = defineProps<{
  server: Server;
}>();

const timer = ref(null);
const opponentTimer = ref(null);

const gameId = ref(null);
const timeControl = ref(null);
const perspective = ref(Color.White);

props.server.on("move_piece", () => {
  timer.value?.pause();
  opponentTimer.value?.start();
});

props.server.on("start_turn", (payload) => {
  timer.value?.sync(payload.time);
  timer.value?.start();
  opponentTimer.value?.pause();
});

props.server.on("start_game", (payload) => {
  gameId.value = payload.game_id;
  perspective.value = payload.color;
  timeControl.value = payload.time_control;
});

props.server.on("game_over", () => {
  gameId.value = null;
  timeControl.value = null;

  timer.value?.pause();
  opponentTimer.value?.pause();
});

function resign() {
  props.server.send("resign", gameId.value);
}
</script>

<template>
  <div class="game">
    <slot :game-id="gameId" :perspective="perspective" />

    <div class="timers" v-if="timeControl">
      <Timer
        ref="opponentTimer"
        class="opponent-timer"
        :duration="timeControl.duration"
        :increment="timeControl.increment"
      />

      <div class="text-center">
        <Timer
          ref="timer"
          class="timer"
          :duration="timeControl.duration"
          :increment="timeControl.increment"
        />

        <Button large danger data-test="resign" @click="resign">Resign</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game {
  margin: auto;
  display: flex;
}
.button {
  padding-left: 25px;
  padding-right: 25px;
}
.text-center {
  text-align: center;
}
.timers {
  display: flex;
  margin-left: 20px;
  flex-direction: column;
  justify-content: space-between;
}
</style>
