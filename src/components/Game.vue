<script setup lang="ts">
import { ref } from "vue";
import { Server } from "@/server";

const props = defineProps<{
  server: Server;
}>();

const gameId = ref(null);
const perspective = ref("white");

props.server.on("start_game", (payload) => {
  gameId.value = payload.game_id;
  perspective.value = payload.color;
});

props.server.on("game_over", () => {
  gameId.value = null;
});
</script>

<template>
  <slot :game-id="gameId" :perspective="perspective" />
</template>
