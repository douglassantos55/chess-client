<script setup lang="ts">
import { ref } from "vue";
import { Server } from "@/server";
import Button from "./Button.vue";

const props = defineProps<{
  server: Server;
}>();

const gameId = ref(null);
const waiting = ref(false);

props.server.on("confirm_match", (payload) => {
  gameId.value = payload;
});

props.server.on("match_canceled", () => {
  gameId.value = null;
  waiting.value = false;
});

props.server.on("wait_other_players", () => {
  waiting.value = true;
});

props.server.on("start_game", () => {
  gameId.value = null;
  waiting.value = false;
});

function send(status: string) {
  props.server.send(status, gameId.value);
}
</script>

<template>
  <div class="dialog" v-if="gameId">
    <div class="dialog__content">
      <h2>Match found</h2>
      <p v-if="waiting">Waiting for other players</p>

      <Button
        large
        success
        @click="send('match_confirmed')"
        data-test="confirm"
        :disabled="waiting"
      >
        Accept
      </Button>
      <Button
        danger
        @click="send('match_declined')"
        data-test="decline"
        :disabled="waiting"
      >
        Decline
      </Button>
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: #222;
  margin-top: 0;
}
.dialog {
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}
.dialog__content {
  padding: 20px;
  min-width: 300px;
  border-radius: 5px;
  text-align: center;
  background: #f2f2f2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}
</style>
